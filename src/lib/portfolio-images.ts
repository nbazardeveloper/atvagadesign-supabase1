type PortfolioImageItem = {
  image_url?: string | null;
  slug?: string | null;
  title?: string | null;
};

const portfolioImageAliases: Record<string, string> = {
  burnished: "/images/portfolio/burnished.webp",
  burnishedvenetianplaster: "/images/portfolio/burnished.webp",
  concretemicrocement: "/images/portfolio/concretemicrocement.webp",
  concreteeffect: "/images/portfolio/concretemicrocement.webp",
  polishedmarble: "/images/portfolio/polished_marble.webp",
  polishedmarbleeffect: "/images/portfolio/polished_marble.webp",
  skip: "/images/portfolio/skip.webp",
  skiptrowel: "/images/portfolio/skip.webp",
  skiptroweltexture: "/images/portfolio/skip.webp",
  stone: "/images/portfolio/stone.webp",
  stonetexture: "/images/portfolio/stone.webp",
  travertine: "/images/portfolio/travertine.webp",
  travertineeffect: "/images/portfolio/travertine.webp",
};

function normalizePortfolioKey(value?: string | null) {
  return value?.toLowerCase().replace(/[^a-z0-9]+/g, "") ?? "";
}

export function getPortfolioImageSrc(item: PortfolioImageItem) {
  if (item.image_url) {
    return item.image_url;
  }

  const keys = [item.slug, item.title].map(normalizePortfolioKey).filter(Boolean);
  for (const key of keys) {
    if (portfolioImageAliases[key]) {
      return portfolioImageAliases[key];
    }
  }

  return null;
}