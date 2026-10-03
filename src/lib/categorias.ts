const EQUIVALENCIAS_CATEGORIA_PUBLICA: Record<string, string> = {
  "Tecnologia y accesorios": "Tecnología",
  Ecologicos: "Eco & Sostenibilidad",
  "Accesorios y llaveros": "Llaveros & Accesorios",
};

export function normalizarCategoriaPublica(categoria: string): string {
  const nombre = categoria.trim();
  return EQUIVALENCIAS_CATEGORIA_PUBLICA[nombre] ?? nombre;
}
