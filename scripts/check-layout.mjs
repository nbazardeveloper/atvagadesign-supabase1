#!/usr/bin/env node
/**
 * Layout regression guard.
 *
 * Fails the build if forbidden width-constraining classes are reintroduced
 * anywhere under src/. The site is intentionally edge-to-edge: no centered
 * bounding boxes, no max-w-* page wrappers. Use container-luxe (full-width
 * with internal padding) instead.
 *
 * Run via `npm run lint:layout` or automatically as part of the Vite build
 * (see vite.config.ts → layoutGuardPlugin).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = new URL("../src/", import.meta.url).pathname;

// Patterns that are NEVER allowed inside src/ (with narrow allow-list below).
// Rule of thumb: forbid only patterns that create CENTERED gutters on wide
// screens. A left-aligned `max-w-3xl` on a text block inside a full-width
// padded section is fine — it doesn't box the layout.
const FORBIDDEN = [
  { re: /className="[^"]*\bcontainer\b(?!-luxe)[^"]*"/, msg: "bare `container` class restricts width — use `container-luxe` instead" },
  { re: /\bmx-auto\b[^"'`\n]*\bmax-w-(?!none\b)[\w[\]./-]+/, msg: "mx-auto + max-w-* creates a centered bounding box" },
  { re: /\bmax-w-(?!none\b)[\w[\]./-]+[^"'`\n]*\bmx-auto\b/, msg: "max-w-* + mx-auto creates a centered bounding box" },
  { re: /\bmax-w-\[(?:1[2-9]\d{2}|[2-9]\d{3})px\]/, msg: "max-w-[≥1200px] page wrapper creates a centered bounding box" },
];

// Files allowed to legitimately use these (e.g. internal text-blocks inside
// shadcn primitives, or the layout guard itself). Keep this list tiny.
const ALLOW_FILES = new Set([
  "components/ui/sidebar.tsx",
  "components/ui/sheet.tsx",
  "components/ui/dialog.tsx",
  "components/ui/drawer.tsx",
  "components/ui/alert-dialog.tsx",
  "components/ui/navigation-menu.tsx",
  "components/ui/dropdown-menu.tsx",
  "components/ui/menubar.tsx",
  "components/ui/context-menu.tsx",
  "components/ui/select.tsx",
  "components/ui/tooltip.tsx",
  "components/ui/hover-card.tsx",
  "components/ui/popover.tsx",
  "components/ui/command.tsx",
  "components/ui/calendar.tsx",
  "components/ui/carousel.tsx",
  "components/ui/chart.tsx",
  "components/ui/sonner.tsx",
  "components/ui/toast.tsx",
  "components/ui/toaster.tsx",
  "components/ui/form.tsx",
  "components/ui/input-otp.tsx",
  "components/ui/pagination.tsx",
]);

const SCAN_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".css"]);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (SCAN_EXT.has(extname(entry))) yield p;
  }
}

export function runLayoutCheck() {
  const violations = [];
  for (const file of walk(ROOT)) {
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    if (ALLOW_FILES.has(rel)) continue;
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      for (const { re, msg } of FORBIDDEN) {
        if (re.test(line)) {
          violations.push({ file: rel, line: i + 1, msg, snippet: line.trim().slice(0, 160) });
        }
      }
    });
  }
  return violations;
}

// CLI entry
if (import.meta.url === `file://${process.argv[1]}`) {
  const v = runLayoutCheck();
  if (v.length) {
    console.error("\n✗ Layout regression check failed — edge-to-edge design must be preserved.\n");
    for (const { file, line, msg, snippet } of v) {
      console.error(`  src/${file}:${line}  ${msg}`);
      console.error(`    › ${snippet}`);
    }
    console.error(`\n${v.length} violation(s). Use \`container-luxe\` (full-width + padding) instead of max-w-* / centered containers.\n`);
    process.exit(1);
  }
  console.log("✓ Layout check passed — no forbidden width constraints.");
}
