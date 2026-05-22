# Аудит проекта и деплой на Cloudflare Workers

## Стек проекта

| Компонент | Технология |
|---|---|
| Фреймворк | TanStack Start v1.167 (SSR) |
| Роутер | TanStack Router (file-based) |
| База данных / Auth | Supabase |
| UI | shadcn/ui + Tailwind CSS v4 |
| Пакетный менеджер | Bun |
| Целевая платформа | Cloudflare Workers + Assets |

---

## 🔍 Аудит: что работает, что нет

### ✅ Хорошее состояние

- `wrangler.jsonc` существует с правильным `compatibility_date` и флагом `nodejs_compat` — это критично для `process.env` в Workers
- `@cloudflare/vite-plugin` уже установлен в `dependencies`
- `src/server.ts` корректно обёртывает SSR-ошибки h3 и возвращает брендированную страницу ошибки
- Supabase-клиенты правильно разделены: `client.ts` (браузер), `client.server.ts` (сервер), `auth-middleware.ts` (SSR auth)
- Публичные изображения (`public/images/`) существуют и будут корректно упакованы
- `layoutGuardPlugin` защищает дизайн от регрессий при билде
- Роут `/admin` защищён — проверяет `user_roles` перед рендером

### ⚠️ Проблемы, которые нужно исправить перед деплоем

#### Проблема 1 — КРИТИЧНО: `vite.config.ts` настроен на Vercel

Активная конфигурация использует `nitro({ preset: "vercel" })`. Закомментированная Cloudflare-версия содержит баг: в ней тоже есть строка `nitro({ preset: "vercel" })`, которую забыли убрать.

При деплое на Cloudflare `nitro` не нужен вообще — `@cloudflare/vite-plugin` полностью заменяет его.

#### Проблема 2 — КРИТИЧНО: `wrangler.jsonc` указывает на исходники

```jsonc
"main": "src/server.ts"   // ← это исходник TypeScript, не скомпилированный выход
```

Wrangler для деплоя должен получать **собранный** `dist/server/index.js`. `@cloudflare/vite-plugin` генерирует правильный `dist/server/wrangler.json` автоматически, деплоить нужно именно им.

#### Проблема 3 — КРИТИЧНО: Переменные окружения не настроены для Cloudflare

В проекте два типа переменных:
- **Build-time** (`VITE_*`) — Vite вшивает их в бандл во время сборки через `import.meta.env.*`
- **Runtime** (без префикса) — читаются через `process.env.*` в Worker-окружении

Для Cloudflare оба типа нужно настраивать по-разному (см. раздел ниже).

#### Проблема 4 — НЕКРИТИЧНО: `SUPABASE_SERVICE_ROLE_KEY` отсутствует в `.env`

`client.server.ts` требует этот ключ, но нигде в проекте он пока не используется (ни один роут не импортирует `supabaseAdmin`). Не сломает деплой, но если понадобятся серверные операции с обходом RLS — нужно будет добавить.

#### Проблема 5 — НЕКРИТИЧНО: `nitro` (nitro-nightly) в зависимостях

После перехода на Cloudflare этот пакет больше не нужен. Можно удалить для чистоты.

---

## 🚀 Пошаговый деплой на Cloudflare Workers

### Шаг 1 — Исправить `vite.config.ts`

Заменить весь файл на следующее:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
// @ts-expect-error - plain .mjs script, no types
import { runLayoutCheck } from "./scripts/check-layout.mjs";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

type LayoutViolation = { file: string; line: number; msg: string; snippet: string };

function layoutGuardPlugin(): Plugin {
  return {
    name: "layout-edge-to-edge-guard",
    buildStart() {
      const violations = runLayoutCheck() as LayoutViolation[];
      if (violations.length) {
        const details = violations
          .map((v) => `  src/${v.file}:${v.line}  ${v.msg}\n    › ${v.snippet}`)
          .join("\n");
        this.error(
          `Layout regression: edge-to-edge design must be preserved.\n${details}\n\n` +
            `${violations.length} violation(s). Use \`container-luxe\` instead of max-w-* / centered containers.`,
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [
    // Cloudflare plugin ДОЛЖЕН быть первым — он перехватывает SSR-окружение
    cloudflare({ viteEnvironment: { name: "ssr" } }),

    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),

    tanstackStart({
      server: { entry: "server" },
      disablePluginOrderCheck: true,
    }),

    viteReact(),
    layoutGuardPlugin(),
  ],
  base: "/",
});
```

**Ключевые изменения:**
- `cloudflare()` вместо `nitro({ preset: "vercel" })`
- Убран импорт `nitro`
- `cloudflare()` стоит первым в массиве плагинов (обязательно)

---

### Шаг 2 — Обновить `wrangler.jsonc`

Заменить содержимое на:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "asti-designs-studio",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "dist/server/index.js",
  "assets": {
    "directory": "dist/client"
  },
  "vars": {
    "SUPABASE_URL": "https://zagxrihkwmhdzyjdcwek.supabase.co",
    "VITE_SUPABASE_URL": "https://zagxrihkwmhdzyjdcwek.supabase.co",
    "VITE_SUPABASE_PROJECT_ID": "zagxrihkwmhdzyjdcwek"
  }
}
```

> ⚠️ `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY` и `SUPABASE_SERVICE_ROLE_KEY` — НЕ добавляйте в `wrangler.jsonc`. Они попадут в git. Их нужно добавлять через `wrangler secret` (см. Шаг 4).

---

### Шаг 3 — Собрать проект

```bash
bun run build
```

После успешного билда в `dist/` появится:
```
dist/
  client/       ← статические ассеты (JS, CSS, изображения)
  server/
    index.js    ← Worker-бандл
    wrangler.json  ← авто-сгенерированный конфиг
```

Если билд падает с ошибкой layout-guard — значит, в `src/` были изменения с запрещёнными классами. Исправить до деплоя.

---

### Шаг 4 — Авторизоваться в Cloudflare и добавить секреты

```bash
# Войти в аккаунт Cloudflare
npx wrangler login

# Добавить секреты (спросит значение интерактивно)
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY
npx wrangler secret put VITE_SUPABASE_PUBLISHABLE_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

> **Важно про `VITE_*` переменные**: `VITE_SUPABASE_PUBLISHABLE_KEY` уже вшита в клиентский бандл на этапе `vite build` из локального `.env`. Но если вы будете собирать через CI (GitHub Actions, Cloudflare Pages), нужно добавить её как build-переменную в настройках проекта, а не только как Workers-секрет.

---

### Шаг 5 — Задеплоить

```bash
npx wrangler deploy
```

Wrangler прочитает `wrangler.jsonc`, возьмёт `dist/server/index.js` как Worker-код и `dist/client/` как статические ассеты.

После деплоя URL будет вида:
```
https://asti-designs-studio.YOUR_SUBDOMAIN.workers.dev
```

---

### Шаг 6 — Подключить кастомный домен (опционально)

В Cloudflare Dashboard → Workers & Pages → `asti-designs-studio` → **Custom Domains** → добавить домен.

---

## 🔄 Деплой через Cloudflare Pages (альтернатива)

Если хотите автодеплой из GitHub без ручных команд:

1. Cloudflare Dashboard → **Workers & Pages** → Create → Pages → Connect to Git
2. Выбрать репозиторий
3. Настройки:
   - **Build command**: `bun run build`
   - **Build output directory**: `dist/client`
   - **Environment variables** (Build): добавить все `VITE_*` переменные
4. После первого деплоя добавить **Functions** bindings для Worker-переменных (не-VITE)

> ⚠️ Pages-подход сложнее для SSR. Рекомендуется Workers-подход (Шаги 1–5).

---

## 📋 Чеклист перед деплоем

- [ ] `vite.config.ts` обновлён (cloudflare plugin, без nitro)
- [ ] `wrangler.jsonc` обновлён (main → dist/server/index.js, vars добавлены)
- [ ] `bun run build` проходит без ошибок
- [ ] `npx wrangler login` выполнен
- [ ] Секреты добавлены через `wrangler secret put`
- [ ] Supabase Auth → URL Configuration → добавить `https://your-worker.workers.dev` в **Site URL** и **Redirect URLs**
- [ ] Проверить `/admin` и `/login` после деплоя

---

## 🔐 Важно: Supabase Auth Callback URL

После смены домена с Vercel на Cloudflare обязательно обновить в **Supabase Dashboard → Authentication → URL Configuration**:

- **Site URL**: `https://your-worker.workers.dev` (или кастомный домен)
- **Redirect URLs**: добавить новый URL, можно оставить и старый Vercel-URL

Без этого логин через Supabase Auth не будет работать.

---

## 🧹 Опциональная чистка зависимостей

После перехода на Cloudflare можно удалить:

```bash
bun remove nitro nitro-nightly
```

И удалить `.vercel/` директорию из проекта (или добавить в `.gitignore`, что уже сделано).
