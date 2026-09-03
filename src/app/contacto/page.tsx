import type { Metadata } from "next";
import { FormularioCotizacion } from "@/components/home/FormularioCotizacion";
import { CONTACTO_CORREO, WHATSAPP_NUMERO } from "@/lib/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos tu proyecto de merchandising importado por vía aérea. Respondemos con la fecha límite de confirmación y el plazo real de entrega puerta a puerta.",
};

export default function ContactoPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Contacto", url: "/contacto" },
        ])}
      />

      <div className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40 }}>
        <h1 className="mb-4 max-w-[26ch]">Cuéntanos el proyecto</h1>
        <p className="text-[0.95rem] text-gris max-w-[64ch] mb-6">
          Respondemos con la fecha límite de confirmación y el plazo real puerta a puerta para tu pedido. Si
          prefieres escribir directo, estos son nuestros datos:
        </p>
        <ul className="text-[0.92rem] text-marino space-y-1.5 mb-10">
          <li>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}`}
              className="hover:text-ambar underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +{WHATSAPP_NUMERO}
            </a>
          </li>
          <li>
            Correo:{" "}
            <a href={`mailto:${CONTACTO_CORREO}`} className="hover:text-ambar underline">
              {CONTACTO_CORREO}
            </a>
          </li>
          <li>Lima, Perú</li>
        </ul>
      </div>

      <FormularioCotizacion />
    </main>
  );
}
