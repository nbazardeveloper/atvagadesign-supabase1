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
      title: "ATVAGA Designs | ADU & Residential Design Services in Washington State",
      description: "Modern residential design, ADU plans, permit-ready drawings and home additions in Seattle, Bellevue, Kirkland, Tacoma and surrounding areas. Fast turnaround. City permit submittals.",
      keywords: "ADU design Washington, permit plans Seattle, permit plans Bellevue, home addition design, residential remodel design, ADU permit Seattle",
      path: "/",
      imageAlt: "ATVAGA Designs residential project",
    }),
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...buildSeoMeta({
        title: "ATVAGA Designs | ADU & Residential Design Services in Washington State",
        description: "Modern residential design, ADU plans, permit-ready drawings and home additions in Seattle, Bellevue, Kirkland, Tacoma and surrounding areas. Fast turnaround. City permit submittals.",
        keywords: "ADU design Washington, permit plans Seattle, permit plans Bellevue, home addition design, residential remodel design, ADU permit Seattle",
        path: "/",
        imageAlt: "ATVAGA Designs residential project",
      }).meta,
    ],
    links: [
      ...buildSeoMeta({
        title: "ATVAGA Designs | ADU & Residential Design Services in Washington State",
        description: "Modern residential design, ADU plans, permit-ready drawings and home additions in Seattle, Bellevue, Kirkland, Tacoma and surrounding areas. Fast turnaround. City permit submittals.",
        keywords: "ADU design Washington, permit plans Seattle, permit plans Bellevue, home addition design, residential remodel design, ADU permit Seattle",
        path: "/",
        imageAlt: "ATVAGA Designs residential project",
      }).links,
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,600;1,400&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const schemaOrgJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": seoDefaults.siteName,
  "description": "Residential design and ADU drafting services in Washington State",
  "url": seoDefaults.siteUrl,
  "areaServed": ["Seattle", "Bellevue", "Kirkland", "Redmond", "Tacoma", "Renton", "Everett"],
  "serviceType": [
    "ADU Design",
    "Permit Plans",
    "Home Additions",
    "Drafting Services",
    "3D Renderings"
  ]
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
      <body>
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
