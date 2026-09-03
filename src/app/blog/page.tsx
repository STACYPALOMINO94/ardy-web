import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre importación aérea de merchandising, plazos reales para eventos y marcado y personalización en Lima. Contenido en preparación, vuelve pronto.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-5" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { nombre: "Inicio", url: "/" },
          { nombre: "Blog", url: "/blog" },
        ])}
      />

      <div className="border-b-2 border-marino pb-2.5 mb-6">
        <h1>Blog</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-gris max-w-[60ch]">
          Todavía no hay artículos publicados. Vuelve pronto, o mientras tanto revisa{" "}
          <Link href="/como-funciona" className="text-marino font-semibold hover:underline">
            cómo funciona la importación aérea
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-linea p-5 hover:border-linea-2"
            >
              <h2 className="text-marino mb-2 text-[1.05rem]">{post.titulo}</h2>
              <p className="text-[0.88rem] text-gris">{post.resumen}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
