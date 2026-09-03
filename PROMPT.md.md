# PROMPT MAESTRO — Sitio Web ARDY Import
# Para Claude Code · Versión definitiva

---

## ANTES DE EMPEZAR

Lee estos dos archivos completos ANTES de escribir una sola línea de código:

1. `referencia.html` — versión funcional del sitio ya validada. Define paleta, componentes, espaciado y tono. Tu trabajo es llevarlo a Next.js sin perder calidad visual.
2. `PROMPT.md` (este archivo) — especificaciones completas de SEO, datos, rutas y arquitectura.

Si algo en este prompt contradice la referencia visual, la referencia visual manda.

---

## STACK OBLIGATORIO

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- Output estático (`output: 'export'`)
- GitHub + Vercel (ya conectados, CI/CD automático)
- Sin backend propio
- Sin base de datos
- Sin autenticación
- Sin pasarela de pago, sin membresías, sin carrito
- La conversión termina en formulario + WhatsApp

---

## DATOS DEL NEGOCIO (no cambiar, no inventar)

**Empresa:** ARDY Import
**Ciudad:** Lima, Perú
**Moneda:** Soles (S/)
**Propuesta de valor:** La importación aérea no vende precio. Vende plazo.

**Cadena de plazo real (días hábiles, arranca con pago confirmado):**
- Formato aprobado por agente: 3
- Almacén en China: 3
- Vuelo (10 días calendario): 7
- Nacionalización canal verde: 1 / canal rojo: 3
- Entrega en Lima: 1
- **Total en blanco: 15 a 17 días hábiles (~3 semanas calendario)**
- Grabado en Lima (+4): **Total con grabado: 19 a 21 días hábiles (~4 semanas)**
- Bajo producción: suma días de fabricación según proveedor (variable)

**Reglas de negocio que deben aparecer donde corresponda:**
- El plazo corre desde el pago confirmado, no desde la conversación.
- El grabado se hace en Lima, no en China. El arte se aprueba mientras el producto vuela.
- La cantidad entre 100 y 1000 unidades casi no cambia el plazo.
- Bluetooth NO requiere permiso MTC en Perú.
- Productos con WiFi o RF sí pueden requerir permiso (se indica por SKU en el campo permisoMtc).

**Dos públicos:**
1. Agencias de eventos y activaciones — compran con marca puesta, necesitan plazo y entrega completa
2. Revendedores, imprentas y talleres — compran en blanco, estampan ellos

---

## FUENTE DE DATOS DE PRODUCTOS

Los productos viven en `src/data/productos.ts`.

Este archivo se actualiza automáticamente:
1. Usuario exporta CSV desde el cotizador → va a Google Drive
2. Google Apps Script lo detecta → genera JSON en `src/data/raw/`
3. GitHub Actions procesa el JSON → actualiza `productos.ts`
4. Vercel hace redeploy automático

**Nunca editar productos.ts a mano.**

Estructura de cada producto:

```typescript
export const productos = [
  {
    id: number,
    slug: string,                    // URL del producto: "bandana-para-mascotas"
    nombre: string,
    categoria: string,               // "Mascotas", "Pines", "USB", "Audio", "Ejecutivos", "Textil", "Escritura", etc.
    descripcionCorta: string,        // máx 15 palabras
    descripcionLarga: string,        // 3-4 frases
    moq: number,                     // mínimo de compra
    precios: {
      100: number,
      300: number,
      500: number,
      1000: number,
    },
    material: string,
    tecnicas: string[],              // ["DTF TEXTIL", "SERIGRAFIA"]
    areaMarcado: string,             // "10 x 10"
    colores: string[],               // ["Rojo", "Negro", "Azul"]
    tallas: string[],                // ["S", "M", "L"] o [] si no aplica
    disponibilidad: string,          // "En stock" o "Bajo producción"
    permisoMtc: boolean,
    esNovedad: boolean,
    fotos: Array<{ url: string, alt: string }>,  // máx 4 fotos, URLs directas
    seoTitle: string,
    seoMeta: string,
    palabraClave: string,
    fechaActualizacion: string,      // "2026-09-02"
  }
];
```

**IMPORTANTE:** Las categorías crecen con el tiempo. Todo componente que las liste debe leerlas dinámicamente desde `productos.ts`. Nunca hardcodear categorías.

---

## PALETA EXACTA (viene del logo real, no cambiar)

```css
--marino: #16283C
--marino-2: #1F3854
--marino-3: #0D1926
--oliva: #6B7A4F
--oliva-2: #5A6842
--ambar: #B8842A
--ambar-2: #E3B65C
--crema: #F4EFE2
--crema-2: #FBF8F1
--tinta: #1B1B18
--gris: #6C6A61
--linea: #DED6C4
--linea-2: #C9BEA5
--ok: #3E6B41
--alerta: #8E3B2E
```

El ámbar es el color funcional del sistema de plazos y estados. No usarlo como decoración.
Escala de espaciado: 8, 16, 24, 40, 64, 88. Nada fuera de esa escala.

---

## COMPONENTES OBLIGATORIOS (portados de referencia.html)

- Barra superior fina con contacto, sobre el nav
- Nav oscuro pegajoso con desplegable de categorías (generado dinámicamente)
- Banner rotativo de 3 mensajes, flechas, puntos, avance automático 7 segundos (respeta prefers-reduced-motion)
- Franja del validador de fecha de evento con resultado en línea
- Mosaicos de color con figura de producto al fondo y dos celdas anchas
- Dos carruseles horizontales con flechas: Destacados y Nuevos modelos
- Tarjeta de producto con etiquetas, selector de tono, ampliación al hover, capa "Ver ficha"
- Filtros por categoría, modalidad y disponibilidad
- Modal de ficha completa con:
  - Carrusel de 4 fotos (click para ampliar)
  - Selector de colores dinámico (desde datos del producto)
  - Selector de tallas dinámico (desde datos del producto, oculto si tallas = [])
  - Selector de cantidad: 100, 300, 500, 1000 unidades
  - Precios escalados en tiempo real según cantidad seleccionada
  - Botón "Solicitar cotización" → construye mensaje y abre WhatsApp
- Lista de cotización en bloque marino, cantidades editables, se vuelca al formulario
- Franja de proceso en 5 celdas
- Footer 4 columnas
- Botones fijos: WhatsApp y volver arriba

**Antipatrones prohibidos:**
- Eyebrows en mayúsculas sobre cada título
- Tarjetas idénticas con sombra gris uniforme
- Animaciones fade-and-slide en cada sección
- Flechitas → pegadas a los enlaces
- Gradientes decorativos
- Stock photos de personas

**Calidad mínima:**
- Responsive real desde 360px
- Foco de teclado visible
- Contraste WCAG AA mínimo
- Lazy loading en todas las imágenes salvo banner
- Objetivo Lighthouse: 90+ Performance, 100 SEO

---

## RUTAS Y PÁGINAS

```
/                                     Home completo
/productos                            Catálogo con filtros y búsqueda
/productos/[slug]                     Ficha de producto
/categoria/[slug]                     Catálogo filtrado por categoría (dinámico)
/nuevos-modelos                       Colección de novedades
/importacion-aerea-merchandising      Servicio core
/marcado-y-personalizacion-lima       Servicio de grabado
/para-agencias-de-eventos             Landing público 1
/para-revendedores-e-imprentas        Landing público 2
/sourcing-importacion-china           Servicio de búsqueda
/como-funciona                        Proceso 5 pasos expandido
/nosotros                             Sobre ARDY
/contacto                             Formulario + WhatsApp
/blog                                 Índice de artículos
/blog/[slug]                          Artículo individual
```

Reglas de URL: todo en español, minúsculas, guiones, sin tildes ni ñ.
Una URL por intención de búsqueda. Nunca cambiar un slug ya publicado sin redirección 301.

---

## SEO

### Metadata por página

```
Home:      "Merchandising importado por vía aérea para eventos | ARDY Import"
Categoría: "Pines metálicos personalizados en Lima | ARDY Import"
Producto:  "[Nombre] personalizado — [material], desde [MOQ] unidades | ARDY Import"
```

- Un solo h1 por página con la palabra clave en lenguaje natural
- h2 que responden preguntas reales: mínimo de compra, plazo, técnicas de marcado, precio referencial
- Meta descripción 150-160 caracteres por página

### JSON-LD obligatorio

- Organization en el layout raíz
- Product en cada ficha (con precios escalados como offers)
- BreadcrumbList en páginas internas
- FAQPage en páginas de categoría

### Sitemap y robots

- Sitemap automático generado desde las rutas
- robots.txt que permita indexación de todo

### Keywords prioritarias

```
"pines metálicos personalizados Lima"
"medallas reconocimiento personalizadas Perú"
"memorias USB personalizadas para evento"
"merchandising urgente para evento"
"importar merchandising de China por avión"
```

---

## FORMULARIO Y WHATSAPP

Sin backend. Al enviar el formulario:
1. Construye mensaje con los datos
2. Abre https://wa.me/51[[NUMERO]]?text=[mensaje_codificado]

El campo de detalle se rellena automáticamente desde la lista de cotización.

---

## FASES

### FASE 1 — Infraestructura y Home
1. Crear proyecto Next.js con el stack definido
2. Configurar paleta y Tailwind
3. Portar desde referencia.html: nav, banner, mosaicos, proceso, footer
4. Home completo con todos los componentes
5. Conectar productos.ts para que los carruseles lean datos reales
6. **DETENERSE y mostrar cómo correr en local**

### FASE 2 — Catálogo y fichas
1. /productos con grid, filtros y búsqueda
2. /categoria/[slug] dinámico
3. /productos/[slug] con modal interactivo completo
4. **DETENERSE y mostrar resultado**

### FASE 3 — SEO, landings y pulido
1. Metadata dinámica por página
2. JSON-LD en todas las páginas
3. Sitemap + robots.txt
4. Landings: /para-agencias-de-eventos, /para-revendedores-e-imprentas
5. Servicios: /importacion-aerea-merchandising, /marcado-y-personalizacion-lima
6. /como-funciona, /nosotros, /contacto
7. Estructura /blog y /blog/[slug] vacía lista para contenido
8. Revisión final performance y accesibilidad
9. **DETENERSE y mostrar resultado final**

---

## EJECUTA SOLO FASE 1 Y DETENTE
