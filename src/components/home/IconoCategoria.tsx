const FORMAS: Record<string, (c: string, o: string) => string> = {
  pin: (c, o) =>
    `<circle cx="50" cy="46" r="30" fill="${c}"/><circle cx="50" cy="46" r="20" fill="none" stroke="${o}" stroke-width="3"/><rect x="47" y="72" width="6" height="18" rx="3" fill="${c}"/>`,
  llaveros: (c, o) =>
    `<circle cx="50" cy="24" r="13" fill="none" stroke="${c}" stroke-width="6"/><rect x="34" y="38" width="32" height="44" rx="6" fill="${c}"/><rect x="42" y="52" width="16" height="4" rx="2" fill="${o}"/>`,
  usb: (c, o) =>
    `<rect x="20" y="38" width="46" height="24" rx="4" fill="${c}"/><rect x="66" y="43" width="18" height="14" rx="2" fill="${o}"/><rect x="28" y="46" width="18" height="3" rx="1.5" fill="${o}"/>`,
  tecnologia: (c, o) =>
    `<rect x="18" y="30" width="64" height="40" rx="5" fill="${c}"/><rect x="26" y="40" width="16" height="12" rx="2" fill="${o}"/><path d="M58 42 q8 8 0 16 M66 36 q14 14 0 28" stroke="${o}" stroke-width="3" fill="none"/>`,
  audio: (c, o) =>
    `<rect x="26" y="26" width="48" height="48" rx="8" fill="${c}"/><circle cx="50" cy="50" r="15" fill="none" stroke="${o}" stroke-width="4"/><circle cx="50" cy="50" r="5" fill="${o}"/>`,
  ejecutivos: (c, o) =>
    `<path d="M22 78 L70 22 l10 8 L34 84 z" fill="${c}"/><path d="M22 78 l12 6" stroke="${o}" stroke-width="4"/>`,
  mascotas: (c, o) =>
    `<circle cx="50" cy="24" r="13" fill="none" stroke="${c}" stroke-width="6"/><rect x="34" y="38" width="32" height="44" rx="6" fill="${c}"/><circle cx="50" cy="60" r="8" fill="${o}"/>`,
  default: (c, o) =>
    `<path d="M50 18 l26 16 v34 l-26 16 -26-16 V34z" fill="${c}"/><circle cx="50" cy="50" r="9" fill="${o}"/>`,
};

function elegirForma(categoria: string): (c: string, o: string) => string {
  const k = categoria.toLowerCase();
  if (k.includes("pin") || k.includes("medalla") || k.includes("moneda")) return FORMAS.pin;
  if (k.includes("llavero")) return FORMAS.llaveros;
  if (k.includes("usb")) return FORMAS.usb;
  if (k.includes("tecnolog") || k.includes("nfc") || k.includes("cable") || k.includes("power")) return FORMAS.tecnologia;
  if (k.includes("audio") || k.includes("parlante") || k.includes("audifono")) return FORMAS.audio;
  if (k.includes("ejecutiv") || k.includes("pluma") || k.includes("tarjetero") || k.includes("escritorio")) return FORMAS.ejecutivos;
  if (k.includes("mascota")) return FORMAS.mascotas;
  return FORMAS.default;
}

export function IconoCategoria({
  categoria,
  color = "#B9BFC4",
  sombra = "rgba(0,0,0,.16)",
  className = "",
}: {
  categoria: string;
  color?: string;
  sombra?: string;
  className?: string;
}) {
  const forma = elegirForma(categoria);
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: forma(color, sombra) }}
    />
  );
}
