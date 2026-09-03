import type { Metadata } from "next";
import "./globals.css";
import { CotizacionProvider } from "@/components/cotizacion/CotizacionContext";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARDY Import",
    template: "%s | ARDY Import",
  },
  description:
    "Importación aérea de merchandising de alto valor. Producto en blanco o marcado en Lima, para proyectos con fecha.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <CotizacionProvider>
          <TopBar />
          <SiteHeader />
          {children}
          <Footer />
          <FloatingButtons />
        </CotizacionProvider>
      </body>
    </html>
  );
}
