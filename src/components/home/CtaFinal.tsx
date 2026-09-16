import { construirLinkWhatsApp } from "@/lib/config";

export function CtaFinal() {
  return (
    <section style={{ padding: "clamp(56px,7vw,88px) 0" }}>
      <div className="mx-auto max-w-[1240px]" style={{ padding: "0 clamp(20px,4vw,60px)" }}>
        <div
          className="rounded-2xl bg-sand flex items-center justify-between gap-8 flex-wrap"
          style={{ padding: "clamp(28px,4vw,44px) clamp(24px,4vw,52px)" }}
        >
          <div className="flex-[1_1_300px]">
            <span className="block w-10 h-0.5 bg-ambar mb-[18px]" />
            <h2 className="text-marino font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(24px,2.8vw,34px)" }}>
              ¿Tienes un proyecto?
            </h2>
            <p className="text-gris text-[16.5px] mt-2">Hablemos y hagámoslo realidad.</p>
          </div>
          <a
            href={construirLinkWhatsApp("Hola, quiero cotizar un proyecto con ARDY Import.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-marino text-white font-bold text-[15px] px-[30px] py-4 rounded-[8px] whitespace-nowrap hover:bg-ambar-accent"
          >
            Cotizar por WhatsApp
          </a>
          <div className="flex-[1_1_300px] flex items-center justify-end gap-[26px] min-w-0">
            {/* image-slot id="ardy-avion": 190x96, fit="contain" (ver handoff, sección CTA final). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/home/avion.webp"
              alt=""
              loading="lazy"
              className="w-[190px] h-24 flex-none object-contain"
            />
            <p className="text-marino text-sm font-bold tracking-[.16em] leading-[1.7]">
              IDEAS
              <br />
              SIN FRONTERAS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
