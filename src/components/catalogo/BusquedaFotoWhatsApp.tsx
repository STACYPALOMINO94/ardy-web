import { existsSync } from "fs";
import { join } from "path";
import { construirLinkWhatsApp } from "@/lib/config";

const RUTA_FOTO = join(process.cwd(), "public", "img", "productos", "busqueda-whatsapp.png");

/**
 * "Búsqueda por WhatsApp": para cuando el cliente tiene la foto de un producto
 * (de otro proveedor, de Pinterest, de un evento anterior) pero no sabe cómo se
 * llama. Foto propia opcional en public/img/productos/busqueda-whatsapp.jpg,
 * detectada en build time — si no existe, ícono decorativo.
 */
export function BusquedaFotoWhatsApp() {
  const tieneFoto = existsSync(RUTA_FOTO);

  return (
    <section className="bg-sand border-b border-linea-soft">
      <div className="mx-auto max-w-[1240px] px-8 pt-4 pb-12">
        <span className="text-[12px] leading-[1.2] font-bold tracking-[.14em] text-oliva uppercase">Productos</span>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 items-center">
          <div className="overflow-hidden self-end -ml-8 -mt-3 -mb-12" style={{ aspectRatio: "1.76" }}>
            {tieneFoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/img/productos/busqueda-whatsapp.png"
                alt="Celular mostrando una foto de producto junto a productos corporativos personalizados"
                className="w-full h-full object-cover"
                style={{ objectPosition: "54% 48%" }}
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-[12px] font-bold tracking-[.14em] text-gris-light uppercase text-center px-5">
                Foto: celular con imagen de producto junto al producto físico
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 border-l border-linea-fuerte pl-12">
            <h1 className="text-marino text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] font-bold tracking-[-0.015em]">
              Búsqueda por WhatsApp
            </h1>
            <p className="text-gris text-[18px] leading-[1.65] max-w-[420px]">Envíanos la foto y te ayudamos a encontrarlo.</p>
            <div className="mt-2">
              <a
                href={construirLinkWhatsApp("Hola, quiero enviarles una foto de un producto que estoy buscando.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-[22px] py-[12px] rounded-sm bg-ambar text-white font-semibold text-[15px] hover:bg-ambar-accent"
              >
                Enviar foto por WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
