import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { buildSeoMeta, seoDefaults } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Error 404</p>
        <h1 className="mt-4 font-display text-6xl">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you're looking for has been moved or doesn't exist.</p>
        <Link to="/" className="mt-8 inline-flex items-center px-8 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.3em]">
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">Please try refreshing the page.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 inline-flex items-center px-6 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.3em]">
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    ...buildSeoMeta({
      title: "Asti Designs — Luxury Decorative Plaster & Venetian Finish Studio",
      description: "Hand-crafted Venetian plaster, microcement, marble, stone and concrete decorative wall finishes for premium interiors.",
      path: "/",
      imageAlt: "Asti Designs decorative plaster feature wall",
    }),
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...buildSeoMeta({
        title: "Asti Designs — Luxury Decorative Plaster & Venetian Finish Studio",
        description: "Hand-crafted Venetian plaster, microcement, marble, stone and concrete decorative wall finishes for premium interiors.",
        path: "/",
        imageAlt: "Asti Designs decorative plaster feature wall",
      }).meta,
    ],
    links: [
      ...buildSeoMeta({
        title: "Asti Designs — Luxury Decorative Plaster & Venetian Finish Studio",
        description: "Hand-crafted Venetian plaster, microcement, marble, stone and concrete decorative wall finishes for premium interiors.",
        path: "/",
        imageAlt: "Asti Designs decorative plaster feature wall",
      }).links,
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const schemaOrgJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": seoDefaults.siteName,
  "description": "Luxury decorative plaster and Venetian finish studio specialising in hand-crafted Venetian plaster, microcement, marble and stone wall finishes for premium interiors.",
  "url": seoDefaults.siteUrl,
  "image": `${seoDefaults.siteUrl}${seoDefaults.defaultImagePath}`,
  "priceRange": "$$$$",
  "serviceType": [
    "Venetian Plaster",
    "Microcement",
    "Tadelakt",
    "Burnished Lime Plaster",
    "Decorative Wall Finishes",
    "Concrete Effect"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Decorative Plaster Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Venetian Plaster" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Microcement & Concrete Effect" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tadelakt" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Decorative Textures" } }
    ]
  }
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaOrgJsonLd }}
        />
      </head>
      <body className="font-sans [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_h4]:font-heading">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const chrome = !pathname.startsWith("/admin") && !pathname.startsWith("/login");

  return (
    <QueryClientProvider client={queryClient}>
      {chrome && <Header />}
      <main className={chrome ? "" : "min-h-screen"}>
        <Outlet />
      </main>
      {chrome && <Footer />}
      <Toaster position="bottom-right" theme="light" />
    </QueryClientProvider>
  );
}
