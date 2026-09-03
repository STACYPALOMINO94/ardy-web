import type { Metadata } from "next";
import { Publicos } from "@/components/home/Publicos";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Sobre ARDY Import",
  description:
    "ARDY Import hace sourcing y verificación de calidad en China, e importa por vía aérea desde Lima, Perú. Merchandising para proyectos con fecha.",
};

export default function NosotrosPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Nosotros", url: "/nosotros" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">La importación aérea no vende precio. Vende plazo.</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-6">
          ARDY Import hace sourcing y verificación de calidad en China, e importa merchandising por vía aérea hacia
          Lima. Trabajamos con dos tipos de cliente: agencias de eventos y activaciones que necesitan el producto
          con la marca puesta, y revendedores, imprentas y talleres que compran en blanco y estampan ellos mismos.
        </p>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Operamos desde Lima, Perú, con registro de casa comercializadora ante el MTC. Todo el catálogo tiene
          precio y plazo referenciales que se confirman por proyecto, porque cada pedido tiene su propia fecha.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
          <Principio
            titulo="El plazo corre desde el pago"
            texto="No desde la primera conversación. Cada cotización indica la fecha límite real de confirmación."
          />
          <Principio
            titulo="El grabado se hace en Lima"
            texto="El arte se aprueba mientras el producto vuela, no antes. Así el diseño no frena el pedido."
          />
          <Principio
            titulo="Bluetooth no necesita permiso MTC"
            texto="Los productos con WiFi o RF sí pueden requerirlo; se indica en cada ficha cuando aplica."
          />
        </div>
      </div>

      <Publicos />

      <div style={{ marginTop: 64 }}>
        <CtaContacto
          titulo="¿Encajas en alguno de los dos perfiles?"
          texto="Cuéntanos qué necesitas y para cuándo. Te respondemos con plazo y precio reales, no aproximados."
        />
      </div>
    </main>
  );
}

function Principio({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="border border-linea p-5">
      <h2 className="mb-1.5 text-[1rem]">{titulo}</h2>
      <p className="text-[0.86rem] text-gris">{texto}</p>
    </div>
  );
}
