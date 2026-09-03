import Link from "next/link";

export function Publicos() {
  return (
    <section
      className="mx-auto max-w-[1240px] px-5 grid grid-cols-1 md:grid-cols-2 gap-4"
      id="publicos"
      style={{ paddingTop: 64 }}
    >
      <div className="p-6 bg-marino text-white">
        <h2 className="text-white mb-2 text-[1.2rem]">Agencias y activaciones</h2>
        <p className="text-[#B9C7D6] text-[0.9rem] mb-3.5">
          Producto entregado con la marca puesta y fecha límite de confirmación clara desde la primera cotización.
        </p>
        <Link
          href="/para-agencias-de-eventos"
          className="text-[0.87rem] font-bold border-b-2 border-ambar pb-0.5 text-white"
        >
          Tengo un evento próximo
        </Link>
      </div>
      <div className="p-6 bg-crema-2 border border-linea">
        <h2 className="text-marino mb-2 text-[1.2rem]">Revendedores e imprentas</h2>
        <p className="text-gris text-[0.9rem] mb-3.5">
          Producto en blanco, precio por volumen y modelos que no rotan en el mercado local. Tú le pones la marca.
        </p>
        <Link
          href="/para-revendedores-e-imprentas"
          className="text-[0.87rem] font-bold border-b-2 border-ambar pb-0.5 text-marino"
        >
          Ver condiciones por volumen
        </Link>
      </div>
    </section>
  );
}
