import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { productos } from "@/data/productos";
import { getCategorias, getProductosPorCategoriaSlug, formatPrecio } from "@/lib/productos";
import { EN_BLANCO, GRABADO_DIAS } from "@/lib/plazos";
import { CatalogoExplorer } from "@/components/catalogo/CatalogoExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getCategorias().map((c) => ({ slug: c.slug }));
}

function buscarCategoria(slug: string) {
  return getCategorias().find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = buscarCategoria(slug);
  if (!categoria) return {};
  return {
    title: `${categoria.nombre} personalizados en Lima`,
    description: `Catálogo de ${categoria.nombre.toLowerCase()} personalizados, importados por vía aérea desde China. ${categoria.cantidad} modelos disponibles, plazo 3 semanas en blanco.`,
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoria = buscarCategoria(slug);
  if (!categoria) notFound();

  const categorias = getCategorias();
  const productosCategoria = getProductosPorCategoriaSlug(slug);

  const moqMin = Math.min(...productosCategoria.map((p) => p.moq));
  const precioDesde = Math.min(...productosCategoria.map((p) => p.precios[1000]));
  const tecnicas = [...new Set(productosCategoria.flatMap((p) => p.tecnicas))];

  const preguntas = [
    {
      pregunta: `¿Cuál es el mínimo de compra para ${categoria.nombre.toLowerCase()}?`,
      respuesta: `El mínimo de compra parte en ${moqMin} unidades. Entre 100 y 1000 unidades el plazo de entrega casi no cambia.`,
    },
    {
      pregunta: `¿Cuánto demora la entrega de ${categoria.nombre.toLowerCase()}?`,
      respuesta: `En blanco, entre ${EN_BLANCO.min} y ${EN_BLANCO.max} días hábiles puerta a puerta desde el pago confirmado. Con grabado en Lima, entre ${
        EN_BLANCO.min + GRABADO_DIAS
      } y ${EN_BLANCO.max + GRABADO_DIAS} días hábiles: el arte se aprueba mientras el producto vuela.`,
    },
    {
      pregunta: `¿Qué técnicas de marcado se usan en ${categoria.nombre.toLowerCase()}?`,
      respuesta:
        tecnicas.length > 0
          ? `Según el modelo: ${tecnicas.map((t) => t.toLowerCase()).join(", ")}.`
          : "Depende del modelo específico; se confirma en la ficha de cada producto.",
    },
    {
      pregunta: `¿Cuál es el precio referencial de ${categoria.nombre.toLowerCase()}?`,
      respuesta: `Desde ${formatPrecio(precioDesde)} por unidad al comprar 1000 unidades. El precio exacto depende del modelo y la cantidad; se confirma por proyecto.`,
    },
  ];

  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Catálogo", url: "/productos" },
          { nombre: categoria.nombre, url: `/categoria/${categoria.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(preguntas)} />

      <nav className="text-[0.82rem] text-gris mb-5" aria-label="Ruta de navegación">
        <Link href="/" className="hover:text-marino">
          Inicio
        </Link>{" "}
        ›{" "}
        <Link href="/productos" className="hover:text-marino">
          Catálogo
        </Link>{" "}
        › <span className="text-tinta">{categoria.nombre}</span>
      </nav>

      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h1>{categoria.nombre}</h1>
        <span className="text-[0.87rem] text-gris whitespace-nowrap">
          {categoria.cantidad} {categoria.cantidad === 1 ? "modelo" : "modelos"}
        </span>
      </div>
      <CatalogoExplorer productos={productos} categorias={categorias} categoriaInicial={slug} />

      <section className="mt-16 max-w-[760px]" aria-labelledby="faq-categoria">
        <h2 id="faq-categoria" className="mb-4">
          Preguntas frecuentes sobre {categoria.nombre.toLowerCase()}
        </h2>
        <div className="space-y-4">
          {preguntas.map((p) => (
            <div key={p.pregunta} className="border-t border-linea pt-4">
              <h3 className="text-marino mb-1.5">{p.pregunta}</h3>
              <p className="text-[0.9rem] text-gris">{p.respuesta}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
