-- ══════════════════════════════════════════════════════════════
-- Автоматический импорт из Supabase Storage → portfolio_items
-- Запусти в Supabase → SQL Editor → New query
-- ══════════════════════════════════════════════════════════════

INSERT INTO public.portfolio_items (title, slug, category, image_url, display_order, is_featured)

SELECT DISTINCT ON (slug)
  title, slug, category, image_url, display_order, is_featured

FROM (
  SELECT
    initcap(
      regexp_replace(
        replace(replace(filename, '_', ' '), '-', ' '),
        '\s+', ' ', 'g'
      )
    ) AS title,

    -- Slug: категория + имя файла + порядковый номер строки для уникальности
    lower(
      regexp_replace(
        replace(replace(
          category_raw || '-' || filename || '-' || rn::text,
          '_', '-'), ' ', '-'),
        '[^a-z0-9\-]', '', 'g'
      )
    ) AS slug,

    initcap(replace(replace(category_raw, '_', ' '), '-', ' ')) AS category,

    'https://knqcgebewtbbwejmmmbg.supabase.co/storage/v1/object/public/project_images/' || name AS image_url,

    (row_number() OVER (ORDER BY name))::int + 1000 AS display_order,

    false AS is_featured

  FROM (
    SELECT
      name,
      row_number() OVER (ORDER BY name) AS rn,
      CASE
        WHEN array_length(string_to_array(name, '/'), 1) = 3
          THEN split_part(name, '/', 2)
        ELSE split_part(name, '/', 1)
      END AS category_raw,
      CASE
        WHEN array_length(string_to_array(name, '/'), 1) = 3
          THEN regexp_replace(split_part(name, '/', 3), '\.[^.]+$', '')
        ELSE
          regexp_replace(split_part(name, '/', 2), '\.[^.]+$', '')
      END AS filename

    FROM storage.objects
    WHERE
      bucket_id = 'project_images'
      AND name NOT LIKE 'residential/%'
      AND name NOT LIKE 'commercial/%'
      AND (
        name ILIKE '%.webp' OR name ILIKE '%.jpg'
        OR name ILIKE '%.jpeg' OR name ILIKE '%.png'
        OR name ILIKE '%.avif'
      )
      AND name NOT LIKE '.%'
  ) AS parsed
) AS final

ON CONFLICT (slug) DO UPDATE SET
  image_url     = EXCLUDED.image_url,
  category      = EXCLUDED.category,
  display_order = EXCLUDED.display_order;
