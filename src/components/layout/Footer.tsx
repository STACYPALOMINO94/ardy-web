import Link from "next/link";
import { getCategorias } from "@/lib/productos";
import { CONTACTO_CORREO, WHATSAPP_NUMERO } from "@/lib/config";

export function Footer() {
  const categorias = getCategorias();

  return (
    <footer className="bg-marino-3 text-[#93A3B4] pt-16 pb-6 text-[0.87rem] mt-16">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6">
          <div>
            <h4 className="text-white text-[0.83rem] mb-3 tracking-[0.05em]">ARDY IMPORT</h4>
            <p>Sourcing y verificación de calidad en China. Merchandising para proyectos con fecha.</p>
            <p className="mt-2.5 mb-3">Registro de casa comercializadora ante el MTC.</p>
            <ul className="list-none">
              <li className="mb-1.5">
                <Link href="/nosotros" className="hover:text-ambar-2">
                  Nosotros
                </Link>
              </li>
              <li className="mb-1.5">
                <Link href="/como-funciona" className="hover:text-ambar-2">
                  Cómo funciona
                </Link>
              </li>
              <li className="mb-1.5">
                <Link href="/blog" className="hover:text-ambar-2">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[0.83rem] mb-3 tracking-[0.05em]">CATÁLOGO</h4>
            <ul className="list-none">
              {categorias.map((cat) => (
                <li key={cat.slug} className="mb-1.5">
                  <Link href={`/categoria/${cat.slug}`} className="hover:text-ambar-2">
                    {cat.nombre}
                  </Link>
                </li>
              ))}
              <li className="mb-1.5">
                <Link href="/nuevos-modelos" className="hover:text-ambar-2">
                  Nuevos modelos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[0.83rem] mb-3 tracking-[0.05em]">SERVICIOS</h4>
            <ul className="list-none">
              <li className="mb-1.5">
                <Link href="/importacion-aerea-merchandising" className="hover:text-ambar-2">
                  Importación aérea
                </Link>
              </li>
              <li className="mb-1.5">
                <Link href="/sourcing-importacion-china" className="hover:text-ambar-2">
                  Búsqueda de producto
                </Link>
              </li>
              <li className="mb-1.5">
                <Link href="/marcado-y-personalizacion-lima" className="hover:text-ambar-2">
                  Marcado en Lima
                </Link>
              </li>
              <li className="mb-1.5">
                <Link href="/para-revendedores-e-imprentas" className="hover:text-ambar-2">
                  Venta a revendedores
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[0.83rem] mb-3 tracking-[0.05em]">CONTACTO</h4>
            <ul className="list-none">
              <li className="mb-1.5">
                <Link href="/contacto" className="hover:text-ambar-2">
                  Formulario de contacto
                </Link>
              </li>
              <li className="mb-1.5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ambar-2"
                >
                  WhatsApp: +{WHATSAPP_NUMERO}
                </a>
              </li>
              <li className="mb-1.5">
                <a href={`mailto:${CONTACTO_CORREO}`} className="hover:text-ambar-2">
                  {CONTACTO_CORREO}
                </a>
              </li>
              <li className="mb-1.5">Lima, Perú</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#23384F] text-[0.79rem] flex justify-between gap-4 flex-wrap">
          <span>© {new Date().getFullYear()} ARDY Import. Todos los derechos reservados.</span>
          <span>Precios y plazos referenciales. Se confirman por proyecto.</span>
        </div>
      </div>
    </footer>
  );
}
