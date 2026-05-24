/**
 * generate-portfolio-sql.js
 *
 * Запуск: node scripts/generate-portfolio-sql.js
 *
 * Сканирует public/images/projects/, берёт каждую папку как категорию,
 * каждый файл как проект. Генерирует SQL для вставки в Supabase.
 * Результат сохраняется в scripts/portfolio_import.sql
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Настройки ──────────────────────────────────────────────────
const BASE_URL = "https://atvaga-designs.rihanna.workers.dev";
const IMG_DIR = path.join(__dirname, "../public/images/projects");
const OUT_FILE = path.join(__dirname, "portfolio_import.sql");
const IMG_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

// Пропустить эти папки (уже загружены)
const SKIP_FOLDERS = new Set(["residential", "3d-renders", "сommercial", "commercial"]);
// ───────────────────────────────────────────────────────────────

function toTitle(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[_\-]+/g, " ")
    .replace(/\s*\(\d+\)/g, "")
    .replace(/\s+\d+$/, "")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSlug(prefix, filename) {
  const base = path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${prefix}-${base}`;
}

function escape(str) {
  return str.replace(/'/g, "''");
}

if (!fs.existsSync(IMG_DIR)) {
  console.error(`Папка не найдена: ${IMG_DIR}`);
  console.error("Убедись что картинки лежат в public/images/projects/<категория>/");
  process.exit(1);
}

const folders = fs
  .readdirSync(IMG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP_FOLDERS.has(d.name))
  .map((d) => d.name);

if (folders.length === 0) {
  console.log("Новых папок не найдено. Добавь папки в public/images/projects/ и запусти снова.");
  process.exit(0);
}

const usedSlugs = new Set();
const rows = [];
let order = 1;

for (const folder of folders.sort()) {
  const folderPath = path.join(IMG_DIR, folder);
  // Название категории = имя папки, пробелы вместо дефисов, Title Case
  const category = folder.replace(/[_\-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const prefix = folder.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 4);

  const files = fs
    .readdirSync(folderPath)
    .filter((f) => IMG_EXTS.has(path.extname(f).toLowerCase()))
    .sort();

  for (const file of files) {
    const title = toTitle(file);
    let slug = toSlug(prefix, file);
    // избегаем дублей
    let i = 2;
    while (usedSlugs.has(slug)) { slug = `${slug}-${i++}`; }
    usedSlugs.add(slug);

    const imageUrl = `${BASE_URL}/images/projects/${folder}/${file}`;
    rows.push({ title, slug, category, imageUrl, order, isFeatured: order <= 6 });
    order++;
  }
}

if (rows.length === 0) {
  console.log("Картинки в новых папках не найдены. Убедись что форматы: .webp .jpg .jpeg .png");
  process.exit(0);
}

const values = rows
  .map(({ title, slug, category, imageUrl, order: o, isFeatured }) =>
    `  ('${escape(title)}', '${escape(slug)}', '${escape(category)}', '${escape(imageUrl)}', ${o}, ${isFeatured})`
  )
  .join(",\n");

const sql = `-- Авто-генерация: ${new Date().toLocaleDateString("ru")}
-- Папки: ${folders.join(", ")}
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
console.log(`✅ Готово! ${rows.length} проектов из папок: ${folders.join(", ")}`);
console.log(`📄 Файл сохранён: scripts/portfolio_import.sql`);
console.log(`\nКатегории которые будут созданы:`);
const cats = [...new Set(rows.map((r) => r.category))];
cats.forEach((c) => console.log(`  · ${c}`));
