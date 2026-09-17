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

  // Anterior/Siguiente recorre el catálogo completo en el mismo orden del
  // array productos.ts (da la vuelta al llegar al final o al principio).
  const indice = productos.findIndex((p) => p.slug === producto.slug);
  const anterior = productos[(indice - 1 + productos.length) % productos.length];
  const siguiente = productos[(indice + 1) % productos.length];

  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 20, paddingBottom: 64 }}>
      <JsonLd data={productoJsonLd(producto)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Productos", url: "/productos" },
          { nombre: producto.categoria, url: `/categoria/${categoriaSlug}` },
          { nombre: producto.nombre, url: `/productos/${producto.slug}` },
        ])}
      />
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-linea-soft pb-5 mb-8">
        <nav className="text-[0.82rem] text-gris" aria-label="Ruta de navegación">
          <Link href="/" className="hover:text-marino">
            Inicio
          </Link>{" "}
          ›{" "}
          <Link href="/productos" className="hover:text-marino">
            Productos
          </Link>{" "}
          ›{" "}
          <Link href={`/categoria/${categoriaSlug}`} className="hover:text-marino">
            {producto.categoria}
          </Link>{" "}
          › <span className="text-tinta">{producto.nombre}</span>
        </nav>
        <div className="flex items-center gap-3 text-[13px] font-semibold text-marino">
          <Link href={`/productos/${anterior.slug}`} className="flex items-center gap-1.5">
            ← Anterior
          </Link>
          <span className="text-linea-2">|</span>
          <Link href={`/productos/${siguiente.slug}`} className="flex items-center gap-1.5">
            Siguiente →
          </Link>
        </div>
      </div>
      <FichaProducto producto={producto} />
    </main>
  );
}
