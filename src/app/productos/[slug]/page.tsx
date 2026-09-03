import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { productos } from "@/data/productos";
import { getProductoPorSlug, toSlug } from "@/lib/productos";
import { FichaProducto } from "@/components/producto/FichaProducto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, productoJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProductoPorSlug(slug);
  if (!producto) return {};
  return {
    // seoTitle ya viene con el sufijo "| ARDY Import" desde el pipeline (procesar-catalogo.mjs):
    // se usa como título absoluto para no duplicar el template del layout raíz.
    title: { absolute: producto.seoTitle },
    description: producto.seoMeta,
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = getProductoPorSlug(slug);
  if (!producto) notFound();

  const categoriaSlug = toSlug(producto.categoria);

  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <JsonLd data={productoJsonLd(producto)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Catálogo", url: "/productos" },
          { nombre: producto.categoria, url: `/categoria/${categoriaSlug}` },
          { nombre: producto.nombre, url: `/productos/${producto.slug}` },
        ])}
      />
      <nav className="text-[0.82rem] text-gris mb-5" aria-label="Ruta de navegación">
        <Link href="/" className="hover:text-marino">
          Inicio
        </Link>{" "}
        ›{" "}
        <Link href="/productos" className="hover:text-marino">
          Catálogo
        </Link>{" "}
        ›{" "}
        <Link href={`/categoria/${categoriaSlug}`} className="hover:text-marino">
          {producto.categoria}
        </Link>{" "}
        › <span className="text-tinta">{producto.nombre}</span>
      </nav>
      <FichaProducto producto={producto} />
    </main>
  );
}
