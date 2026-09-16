const PASOS = [
  { n: "01", texto: "Encuentra el producto" },
  { n: "02", texto: "Cotiza tu proyecto" },
  { n: "03", texto: "Verificamos disponibilidad" },
  { n: "04", texto: "Importamos desde China" },
  { n: "05", texto: "Recibes en Perú" },
];

/**
 * Banda compacta de "cómo funciona" en el Home, a modo de resumen visual.
 * El detalle completo (plazos por vía, día a día) vive en /como-funciona.
 */
export function PasosCompacto() {
  return (
    <section id="pasos" className="border-t border-b border-[#F0EDE5]" style={{ padding: "clamp(40px,5vw,56px) 0" }}>
      <div
        className="mx-auto max-w-[1240px] flex items-center flex-wrap"
        style={{ padding: "0 clamp(20px,4vw,60px)", gap: "clamp(28px,4vw,56px)" }}
      >
        <div className="flex-[0_1_260px]">
          <p className="text-[11.5px] font-bold tracking-[.18em] text-oliva mb-2">CÓMO FUNCIONA</p>
          <h2 className="text-marino font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(24px,2.6vw,32px)" }}>
            En 5 simples pasos
          </h2>
        </div>
        <div
          className="flex-[1_1_460px] grid gap-[22px]"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))" }}
        >
          {PASOS.map((p) => (
            <div key={p.n} className="border-l border-[#E7E3D8] pl-4">
              <p className="text-[12px] font-bold tracking-[.1em] text-ambar mb-1.5">{p.n}</p>
              <p className="text-marino text-sm font-semibold leading-snug">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
