import type { Metadata } from "next";
import { productos } from "@/data/productos";
import { getCategorias } from "@/lib/productos";
import { CatalogoExplorer } from "@/components/catalogo/CatalogoExplorer";
import { BusquedaFotoWhatsApp } from "@/components/catalogo/BusquedaFotoWhatsApp";

export const metadata: Metadata = {
  title: "Catálogo de merchandising personalizado",
  description:
    "Catálogo completo de merchandising importado por vía aérea: pines, tecnología, audio, ejecutivos y más. Filtra por categoría y disponibilidad.",
};

export default function ProductosPage() {
  const categorias = getCategorias();

  return (
    <main>
      <BusquedaFotoWhatsApp />
      <CatalogoExplorer productos={productos} categorias={categorias} />
    </main>
  );
}
