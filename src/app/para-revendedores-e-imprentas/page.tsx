import type { Metadata } from "next";
import Link from "next/link";
import { formatPrecio } from "@/lib/productos";
import { productos } from "@/data/productos";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Merchandising en blanco para revendedores e imprentas",
  description:
    "Producto en blanco importado por vía aérea, precio por volumen desde 100 unidades, modelos que no rotan en el mercado local de Lima. Tú le pones la marca.",
};

const NIVELES = [100, 300, 500, 1000] as const;

export default function RevendedoresPage() {
  const ejemplo = productos[0];

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Revendedores e imprentas", url: "/para-revendedores-e-imprentas" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[28ch]">Producto en blanco, precio por volumen, tú le pones la marca</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Trabajamos con revendedores, imprentas y talleres que ya tienen su propia capacidad de estampado. Compras
          el producto en blanco al precio de volumen y le aplicas tu técnica. El precio baja escalonadamente en
          cuatro niveles de cantidad, iguales para todo el catálogo.
        </p>

        <div className="border border-linea p-6 mb-12 overflow-x-auto">
          <h2 className="mb-4 text-[1.05rem]">Ejemplo de escala de precio</h2>
          <table className="w-full text-[0.88rem] min-w-[420px]">
            <thead>
              <tr className="border-b border-linea text-left text-gris">
                <th className="py-2 font-normal">Producto</th>
                {NIVELES.map((n) => (
                  <th key={n} className="py-2 font-normal text-right">
                    {n} uds
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-marino font-semibold">{ejemplo.nombre}</td>
                {NIVELES.map((n) => (
                  <td key={n} className="py-2 text-right text-marino">
                    {formatPrecio(ejemplo.precios[n])}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="text-[0.78rem] text-gris mt-3">
            Precio referencial por unidad. Cada producto del catálogo tiene su propia escala; se confirma por
            proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-linea p-6">
            <h2 className="mb-2 text-[1.05rem]">Modelos que no rotan en el mercado local</h2>
            <p className="text-[0.9rem] text-gris">
              Al importar por avión directamente desde fábrica en China, sumamos modelos que todavía no están en los
              catálogos genéricos de Lima: tarjetas NFC, sets metálicos, cables multipuerto.
            </p>
          </div>
          <div className="border border-linea p-6">
            <h2 className="mb-2 text-[1.05rem]">Puedes pedir marcado o dejarlo en blanco</h2>
            <p className="text-[0.9rem] text-gris">
              Si prefieres que ARDY se encargue del grabado en Lima, también se puede: solo suma días al plazo.{" "}
              <Link href="/marcado-y-personalizacion-lima" className="text-marino font-semibold hover:underline">
                Ver cómo funciona el marcado
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="text-[0.85rem] text-gris mb-12">
          <Link href="/productos" className="text-marino font-semibold hover:underline">
            Ver catálogo completo
          </Link>{" "}
          con precios por las cuatro cantidades en cada ficha.
        </p>
      </div>

      <CtaContacto
        titulo="¿Cuánto necesitas y para cuándo?"
        texto="Dinos el producto, la cantidad aproximada y si lo quieres en blanco o marcado. Te respondemos con precio y plazo reales."
      />
    </main>
  );
}
