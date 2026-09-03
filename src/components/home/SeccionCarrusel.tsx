import type { ReactNode } from "react";
import type { Producto } from "@/data/productos";
import { Carrusel } from "./Carrusel";
import { ProductCard } from "./ProductCard";

export function SeccionCarrusel({
  id,
  titulo,
  accion,
  productos,
  paddingTop,
}: {
  id?: string;
  titulo: string;
  accion: ReactNode;
  productos: Producto[];
  paddingTop: number;
}) {
  if (productos.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1240px] px-5" id={id} style={{ paddingTop }}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h2>{titulo}</h2>
        {accion}
      </div>
      <Carrusel>
        {productos.map((p) => (
          <div key={p.slug} className="min-w-[236px] flex-none">
            <ProductCard producto={p} />
          </div>
        ))}
      </Carrusel>
    </section>
  );
}
