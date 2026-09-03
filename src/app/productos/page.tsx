import type { Metadata } from "next";
import { productos } from "@/data/productos";
import { getCategorias } from "@/lib/productos";
import { CatalogoExplorer } from "@/components/catalogo/CatalogoExplorer";

export const metadata: Metadata = {
  title: "Catálogo de merchandising personalizado",
  description:
    "Catálogo completo de merchandising importado por vía aérea: pines, tecnología, audio, ejecutivos y más. Filtra por categoría y disponibilidad.",
};

export default function ProductosPage() {
  const categorias = getCategorias();

  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-marino pb-2.5 mb-6">
        <h1>Catálogo</h1>
      </div>
      <CatalogoExplorer productos={productos} categorias={categorias} />
    </main>
  );
}
