const SITE_NAME = "ATVAGA Designs";
const SITE_URL = "https://www.atvaga.com";
const DEFAULT_IMAGE_PATH = "/images/hero/hero.webp";
const DEFAULT_IMAGE_WIDTH = "1200";
const DEFAULT_IMAGE_HEIGHT = "630";

function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  imagePath?: string;
  imageAlt?: string;
  noindex?: boolean;
};

export function buildSeoMeta({
  title,
  description,
  path,
  keywords,
  imagePath = DEFAULT_IMAGE_PATH,
  imageAlt = title,
  noindex = false,
}: SeoOptions) {
  const pageUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: DEFAULT_IMAGE_WIDTH },
      { property: "og:image:height", content: DEFAULT_IMAGE_HEIGHT },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: pageUrl }],
  };
}

export const seoDefaults = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultImagePath: DEFAULT_IMAGE_PATH,
};