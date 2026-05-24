/**
 * generate-from-storage.js
 *
 * Читает файлы из Supabase Storage и генерирует SQL для portfolio_items.
 *
 * Запуск: node scripts/generate-from-storage.js
 * Результат: scripts/portfolio_import.sql
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Настройки ──────────────────────────────────────────────────
const SUPABASE_URL = "https://knqcgebewtbbwejmmmbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_dl_lr3sGbtURYd5GZ0MSwg_RU9IIKkx";
const BUCKET = "project_images";

// Какие папки верхнего уровня обработать (оставь пустым [] чтобы взять ВСЕ)
const ONLY_FOLDERS = ["interior"];

// Пропустить эти папки верхнего уровня
const SKIP_FOLDERS = new Set(["residential", "commercial"]);

const OUT_FILE = path.join(__dirname, "portfolio_import.sql");
// ───────────────────────────────────────────────────────────────

const IMG_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

function toTitle(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[_\-]+/g, " ")
    .replace(/\s*\(\d+\)/g, "")
    .replace(/\s+\d+$/, "")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toCategory(folderName) {
  return folderName
    .replace(/[_\-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function escape(str) {
  return str.replace(/'/g, "''");
}

async function listFiles(prefix) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_KEY}`,
      apikey: SUPABASE_KEY,
    },
    body: JSON.stringify({ prefix, limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } }),
  });
  if (!res.ok) throw new Error(`Storage list failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log("🔍 Получаю список папок из Supabase Storage...\n");

  // Получаем папки верхнего уровня
  let topLevel = await listFiles("");
  let folders = topLevel
    .filter((item) => item.id === null) // папки имеют id === null
    .map((item) => item.name)
    .filter((name) => !SKIP_FOLDERS.has(name));

  if (ONLY_FOLDERS.length > 0) {
    folders = folders.filter((f) => ONLY_FOLDERS.includes(f));
  }

  if (folders.length === 0) {
    console.log("Папки не найдены. Проверь настройки ONLY_FOLDERS и SKIP_FOLDERS.");
    return;
  }

  console.log(`📁 Папки: ${folders.join(", ")}\n`);

  const rows = [];
  const usedSlugs = new Set();
  let order = 1;

  for (const topFolder of folders) {
    // Получаем подпапки внутри (например interior/bathroom)
    const subItems = await listFiles(`${topFolder}/`);
    const subFolders = subItems.filter((item) => item.id === null).map((item) => item.name);

    if (subFolders.length > 0) {
      // Есть подпапки — используем их как категории
      for (const subFolder of subFolders) {
        const category = toCategory(subFolder);
        const files = await listFiles(`${topFolder}/${subFolder}/`);
        const images = files.filter(
          (f) => f.id !== null && IMG_EXTS.has(path.extname(f.name).toLowerCase())
        );

        console.log(`  📂 ${topFolder}/${subFolder}/ — ${images.length} фото → категория "${category}"`);

        for (const img of images) {
          const title = toTitle(img.name);
          const slugBase = `${subFolder.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${img.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}`;
          let slug = slugBase;
          let i = 2;
          while (usedSlugs.has(slug)) { slug = `${slugBase}-${i++}`; }
          usedSlugs.add(slug);

          const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${topFolder}/${subFolder}/${img.name}`;
          rows.push({ title, slug, category, imageUrl, order, isFeatured: false });
          order++;
        }
      }
    } else {
      // Нет подпапок — сама папка верхнего уровня = категория
      const category = toCategory(topFolder);
      const files = subItems.filter(
        (f) => f.id !== null && IMG_EXTS.has(path.extname(f.name).toLowerCase())
      );

      console.log(`  📂 ${topFolder}/ — ${files.length} фото → категория "${category}"`);

      for (const img of files) {
        const title = toTitle(img.name);
        const slugBase = `${topFolder.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${img.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}`;
        let slug = slugBase;
        let i = 2;
        while (usedSlugs.has(slug)) { slug = `${slugBase}-${i++}`; }
        usedSlugs.add(slug);

        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${topFolder}/${img.name}`;
        rows.push({ title, slug, category, imageUrl, order, isFeatured: false });
        order++;
      }
    }
  }

  if (rows.length === 0) {
    console.log("\nФайлы не найдены.");
    return;
  }

  const values = rows
    .map(({ title, slug, category, imageUrl, order: o, isFeatured }) =>
      `  ('${escape(title)}', '${escape(slug)}', '${escape(category)}', '${escape(imageUrl)}', ${o}, ${isFeatured})`
    )
    .join(",\n");

  const sql = `-- Авто-генерация из Supabase Storage: ${new Date().toLocaleDateString("ru")}
-- Бакет: ${BUCKET}, папки: ${folders.join(", ")}
-- Запусти в Supabase → SQL Editor → New query

INSERT INTO public.portfolio_items (title, slug, category, image_url, display_order, is_featured)
VALUES
${values}
ON CONFLICT (slug) DO UPDATE SET
  image_url     = EXCLUDED.image_url,
  category      = EXCLUDED.category,
  display_order = EXCLUDED.display_order;

-- Итого: ${rows.length} проектов
`;

  fs.writeFileSync(OUT_FILE, sql, "utf8");
  console.log(`\n✅ Готово! ${rows.length} проектов`);
  console.log(`📄 Файл: scripts/portfolio_import.sql`);
  console.log(`\nКатегории:`);
  [...new Set(rows.map((r) => r.category))].forEach((c) => console.log(`  · ${c}`));
}

main().catch(console.error);
