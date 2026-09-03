/**
 * Reglas de plazo de ARDY Import. Ver PROMPT.md — "no cambiar, no inventar".
 * Cadena: formato aprobado (3) + almacén China (3) + vuelo (7 hábiles / 10 días calendario)
 * + nacionalización (1 canal verde a 3 canal rojo) + entrega (1).
 * El grabado se hace en Lima y solo suma días si el cliente pide marcado.
 */
export const EN_BLANCO = { min: 15, max: 17 } as const;
export const GRABADO_DIAS = 4;
/** [PLACEHOLDER] días hábiles de fabricación cuando el producto está bajo producción. Varía por proveedor. */
export const PRODUCCION_EXTRA_DIAS = 10;
export const HOLGURA_DIAS = 5;

export const PASOS_PROCESO = [
  { n: "01", titulo: "Pago y formato aprobado", detalle: "3 días hábiles" },
  { n: "02", titulo: "Almacén en China", detalle: "3 días hábiles" },
  { n: "03", titulo: "Vuelo", detalle: "10 días calendario" },
  { n: "04", titulo: "Nacionalización", detalle: "1 día · 3 en canal rojo" },
  { n: "05", titulo: "Grabado y entrega", detalle: "4 días · solo con marcado" },
] as const;

/** Cuenta días hábiles (lun-vie) estrictamente entre dos fechas, sin contar el día de inicio. */
export function diasHabilesEntre(desde: Date, hasta: Date): number {
  const d = new Date(desde);
  d.setHours(0, 0, 0, 0);
  const e = new Date(hasta);
  e.setHours(0, 0, 0, 0);
  let n = 0;
  while (d < e) {
    d.setDate(d.getDate() + 1);
    const dia = d.getDay();
    if (dia !== 0 && dia !== 6) n++;
  }
  return n;
}

export type EstadoPlazo = "ok" | "ajustado" | "no-llega" | "invalido";

export interface ResultadoValidacion {
  estado: EstadoPlazo;
  mensaje: string;
}

export function evaluarPlazo(params: {
  fechaEvento: string; // "YYYY-MM-DD"
  bajoProduccion: boolean;
  conGrabado: boolean;
}): ResultadoValidacion {
  const { fechaEvento, bajoProduccion, conGrabado } = params;
  if (!fechaEvento) {
    return { estado: "invalido", mensaje: "Ingresa la fecha del evento para calcular." };
  }
  const [y, m, d] = fechaEvento.split("-").map(Number);
  const evento = new Date(y, m - 1, d);
  const disponibles = diasHabilesEntre(new Date(), evento);

  if (disponibles <= 0) {
    return { estado: "invalido", mensaje: "Esa fecha ya pasó. Revisa el dato." };
  }

  const extra = bajoProduccion ? PRODUCCION_EXTRA_DIAS : 0;
  const grabado = conGrabado ? GRABADO_DIAS : 0;
  const minTotal = EN_BLANCO.min + extra + grabado;
  const necesarios = EN_BLANCO.max + extra + grabado;
  const margen = disponibles - necesarios;
  const rango = `${minTotal} a ${necesarios} días hábiles`;
  const reloj = " El plazo corre desde el pago confirmado.";
  const arte = conGrabado ? " El arte puede aprobarse mientras el producto vuela." : "";

  if (margen >= HOLGURA_DIAS) {
    return {
      estado: "ok",
      mensaje: `Llegas con margen. Estimado ${rango} y tienes ${disponibles}. Confirma el pedido dentro de los próximos ${margen} días hábiles.${reloj}${arte}`,
    };
  }
  if (margen >= 0) {
    return {
      estado: "ajustado",
      mensaje: `Llegas ajustado. Estimado ${rango} contra ${disponibles} disponibles. Sin espacio para canal rojo ni demoras.${reloj}${arte}`,
    };
  }
  return {
    estado: "no-llega",
    mensaje: `Así no llega: faltan ${Math.abs(margen)} días hábiles sobre un estimado de ${rango}.${
      conGrabado
        ? ` Sin grabado se ahorran ${GRABADO_DIAS} días hábiles.`
        : " Mira producto disponible en Perú o mueve la fecha."
    }`,
  };
}
