import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" className={manrope.variable}>
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
