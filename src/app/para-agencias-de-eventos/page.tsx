import type { Metadata } from "next";
import { EN_BLANCO, GRABADO_DIAS } from "@/lib/plazos";
import { getDestacados } from "@/lib/productos";
import { SeccionCarrusel } from "@/components/home/SeccionCarrusel";
import { CtaContacto } from "@/components/paginas/CtaContacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Merchandising para agencias de eventos y activaciones",
  description:
    "Merchandising importado con tu marca puesta, entregado a tiempo para el evento. Fecha límite de confirmación clara desde la primera cotización.",
};

export default function AgenciasPage() {
  const destacados = getDestacados();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Agencias de eventos", url: "/para-agencias-de-eventos" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">Merchandising con marca puesta, listo para el evento</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-10">
          Trabajamos con agencias de eventos y activaciones que necesitan el producto entregado completo, con el
          logo puesto, en la fecha exacta. Desde la primera cotización te damos la fecha límite en la que el pedido
          debe estar confirmado y pagado para llegar a tiempo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          <Beneficio
            titulo="Fecha límite clara"
            texto="El plazo corre desde el pago confirmado. Te decimos el último día para confirmar, no una fecha aproximada."
          />
          <Beneficio
            titulo="Marca puesta, no en blanco"
            texto={`Grabado en Lima en ${GRABADO_DIAS} días hábiles adicionales (${EN_BLANCO.min + GRABADO_DIAS} a ${EN_BLANCO.max + GRABADO_DIAS} días puerta a puerta). El arte se aprueba mientras el producto vuela.`}
          />
          <Beneficio
            titulo="Modelos que no rotan"
            texto="Tarjetas NFC, sets metálicos, cables multipuerto: la razón por la que la activación no repite el llavero del año pasado."
          />
        </div>
      </div>

      <SeccionCarrusel
        titulo="Modelos para activaciones"
        paddingTop={0}
        accion={null}
        productos={destacados}
      />

      <div style={{ marginTop: 64 }}>
        <CtaContacto
          titulo="¿Tienes un evento próximo?"
          texto="Cuéntanos la fecha y la cantidad estimada. Te respondemos con el plazo real, no uno optimista."
        />
      </div>
    </main>
  );
}

function Beneficio({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="border border-linea p-6">
      <h2 className="mb-2 text-[1.05rem]">{titulo}</h2>
      <p className="text-[0.88rem] text-gris">{texto}</p>
    </div>
  );
}
