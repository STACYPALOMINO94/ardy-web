import { EN_BLANCO, GRABADO_DIAS, PASOS_PROCESO } from "@/lib/plazos";

export function Proceso() {
  return (
    <section className="mx-auto max-w-[1240px] px-5" id="proceso" style={{ paddingTop: 64 }}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h2>Cómo funciona</h2>
        <span className="text-[0.87rem] text-gris whitespace-nowrap">
          En blanco: {EN_BLANCO.min} a {EN_BLANCO.max} días hábiles · Con grabado: {EN_BLANCO.min + GRABADO_DIAS} a{" "}
          {EN_BLANCO.max + GRABADO_DIAS}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-linea border border-linea">
        {PASOS_PROCESO.map((p) => (
          <div key={p.n} className="bg-crema-2 px-3.5 py-4">
            <span className="text-ambar font-extrabold text-[1.4rem] tracking-[-0.04em]">{p.n}</span>
            <h3 className="mt-1 mb-0.5 text-marino text-[0.92rem]">{p.titulo}</h3>
            <span className="text-[0.79rem] text-gris">{p.detalle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
