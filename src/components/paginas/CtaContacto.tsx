import Link from "next/link";

export function CtaContacto({
  titulo,
  texto,
  textoBoton = "Cuéntanos tu proyecto",
}: {
  titulo: string;
  texto: string;
  textoBoton?: string;
}) {
  return (
    <section className="bg-marino text-white py-10">
      <div className="mx-auto max-w-[1240px] px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <h2 className="text-white mb-1.5">{titulo}</h2>
          <p className="text-[#B9C7D6] text-[0.92rem] max-w-[54ch]">{texto}</p>
        </div>
        <Link
          href="/contacto"
          className="shrink-0 bg-ambar text-marino-3 px-6 py-3.5 font-bold text-[0.92rem] hover:bg-ambar-2"
        >
          {textoBoton}
        </Link>
      </div>
    </section>
  );
}
