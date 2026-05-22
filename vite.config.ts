import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
// @ts-expect-error - plain .mjs script, no types
import { runLayoutCheck } from "./scripts/check-layout.mjs";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

type LayoutViolation = { file: string; line: number; msg: string; snippet: string };

// Vite plugin that fails the build if forbidden width-constraining classes
// are reintroduced anywhere under src/.
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
            `${violations.length} violation(s). Use \`container-luxe\` (full-width + padding) instead of max-w-* / centered containers.`,
        );
      }
    },
  };
}

export default defineConfig(() => ({
  plugins: [
    // Cloudflare must initialize the SSR/runtime environment before framework plugins.
    cloudflare({ viteEnvironment: { name: "ssr" } }),

    // 1. Tailwind строго на первом месте среди трансформаций CSS/JSX
    tailwindcss(),

    // 2. Вспомогательные утилиты для TypeScript
    tsConfigPaths({ projects: ["./tsconfig.json"] }),

    // 3. Плагин фреймворка TanStack Start
    tanstackStart({
      server: { entry: "server" },
      disablePluginOrderCheck: true,
    }),

    // 4. JSX-трансформация должна идти после TanStack Router/Start
    viteReact(),
    layoutGuardPlugin(),
  ],
  // Гарантируем, что ассеты и файлы стилей будут адресоваться от корня домена
  base: "/",
}));
