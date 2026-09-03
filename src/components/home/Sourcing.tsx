import Link from "next/link";
import { SOURCING_PRECIO_PH } from "@/lib/config";

export function Sourcing() {
  return (
    <section className="bg-oliva text-white py-10" id="sourcing" style={{ marginTop: 64 }}>
      <div className="mx-auto max-w-[1240px] px-5 flex gap-10 items-center flex-wrap">
        <div className="flex-1 min-w-[290px]">
          <h2 className="text-white">¿No lo encuentras? Lo buscamos en China</h2>
          <p className="text-[#E9EEE0] text-[0.92rem] max-w-[50ch] mt-2">
            Cotizar el catálogo es gratis y siempre lo será. La búsqueda de un producto que nadie tiene acá tiene un
            costo, y se descuenta íntegro si la importación se ejecuta.
          </p>
          <Link
            href="/sourcing-importacion-china"
            className="inline-block mt-3.5 text-[0.87rem] font-bold border-b-2 border-white pb-0.5 text-white"
          >
            Cómo funciona la búsqueda
          </Link>
        </div>
        <div className="bg-white text-tinta p-6 border-l-[5px] border-ambar min-w-[236px]">
          <p className="text-[1.7rem] font-extrabold text-marino tracking-[-0.03em]">S/ {SOURCING_PRECIO_PH}</p>
          <p className="text-[0.82rem] text-gris mt-1.5">
            Incluye 3 opciones de proveedor con ficha técnica y costo puesto en Lima. Si ya nos compraste, va
            incluida.
          </p>
        </div>
      </div>
    </section>
  );
}
