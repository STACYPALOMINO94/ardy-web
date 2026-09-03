import type { Metadata } from "next";
import Link from "next/link";
import { productos } from "@/data/productos";
import { EN_BLANCO, GRABADO_DIAS } from "@/lib/plazos";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Marcado y personalización en Lima",
  description:
    "El grabado y la personalización se hacen en Lima, no en China: tu arte se aprueba mientras el producto vuela. Suma solo 4 días hábiles al plazo.",
};

function formatearTecnica(t: string): string {
  const s = t.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function MarcadoPage() {
  const tecnicas = [...new Set(productos.flatMap((p) => p.tecnicas))].map(formatearTecnica).sort();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Marcado y personalización en Lima", url: "/marcado-y-personalizacion-lima" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">La marca se pone en Lima, no en China</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          El producto viaja en blanco y se marca acá. Eso significa que tu arte se aprueba mientras el producto
          vuela, no antes de despacharlo: el diseño no frena el pedido. El marcado en Lima suma {GRABADO_DIAS} días
          hábiles al plazo: {EN_BLANCO.min} a {EN_BLANCO.max} días hábiles en blanco pasan a ser{" "}
          {EN_BLANCO.min + GRABADO_DIAS} a {EN_BLANCO.max + GRABADO_DIAS} con grabado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-linea p-6">
            <h2 className="mb-2">Técnicas disponibles</h2>
            <p className="text-[0.9rem] text-gris mb-3">
              La técnica depende del material y el modelo. En nuestro catálogo actual usamos:
            </p>
            <ul className="text-[0.9rem] text-marino list-disc pl-5 space-y-1">
              {tecnicas.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="border border-linea p-6">
            <h2 className="mb-2">Producto en blanco, si prefieres marcarlo tú</h2>
            <p className="text-[0.9rem] text-gris">
              Si ya tienes taller o imprenta, puedes comprar el producto en blanco al precio por volumen y aplicar tu
              propia técnica. Es la opción que usan revendedores e imprentas que no necesitan que ARDY marque el
              producto.
            </p>
            <Link
              href="/para-revendedores-e-imprentas"
              className="inline-block mt-3 text-[0.87rem] font-bold border-b-2 border-ambar pb-0.5 text-marino"
            >
              Ver condiciones por volumen
            </Link>
          </div>
        </div>
      </div>

      <CtaContacto
        titulo="¿Ya tienes el arte o todavía no?"
        texto="No hace falta tenerlo listo para confirmar el pedido: el diseño se aprueba mientras el producto está en vuelo."
      />
    </main>
  );
}
