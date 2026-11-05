import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, ExternalLink } from "lucide-react";
import { books, getBook } from "@/lib/content";
import { useCart, money } from "@/lib/cart";
import { BookCover } from "@/components/site/BookCover";
import { BookCard, Reveal, UnpublishedBadge, goldBtn } from "@/components/site/ui";

export const Route = createFileRoute("/bookstore/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Christ Hope Bookstore` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Book unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: BookPage,
});

function BookPage() {
  const b = Route.useLoaderData();
  const { add } = useCart();
  const [format, setFormat] = useState(b.formats[0]);
  const related = books.filter((x) => x.slug !== b.slug && x.category === b.category).concat(books.filter((x) => x.slug !== b.slug && x.category !== b.category)).slice(0, 3);

  return (
    <>
      <section className="bg-night pb-24 pt-36 text-on-dark">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <Reveal className="flex justify-center"><BookCover book={b} size="lg" /></Reveal>
          <Reveal delay={0.15}>
            <UnpublishedBadge />
            <p className="eyebrow mt-5 text-gold">{b.category}</p>
            <h1 className="mt-3 text-5xl leading-tight md:text-6xl">{b.title}</h1>
            <p className="mt-3 font-display text-2xl italic text-on-dark/75">{b.subtitle}</p>
            <p className="mt-2 text-sm text-on-dark/60">by {b.author}</p>
            <p className="mt-6 text-on-dark/80">{b.description}</p>
            <p className="mt-8 font-display text-4xl text-gold">{money(b.price)}</p>
            <div className="mt-6">
              <p className="eyebrow text-[0.65rem] text-on-dark/60">Direct download format</p>
              <div className="mt-3 flex gap-2">
                {b.formats.map((f) => (
                  <button key={f} onClick={() => setFormat(f)} className={`rounded-full border px-5 py-2 text-sm ${format === f ? "border-gold bg-gold/15 text-gold" : "border-on-dark/25"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => add(b.slug, format)} className={goldBtn}><ShoppingBag className="h-4 w-4" />Add to bag — Christ Hope Direct</button>
            </div>
            <div className="mt-6 rounded-md border border-on-dark/15 p-4 text-sm text-on-dark/70">
              {b.amazonUrl ? (
                <a href={b.amazonUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold"><ExternalLink className="h-4 w-4" />Buy on Amazon Kindle</a>
              ) : (
                <>Amazon Kindle edition: not yet available.</>
              )}
              <p className="mt-2 text-xs text-on-dark/50">Direct purchases are EPUB/PDF downloads from CHRIST HOPE — separate from Amazon Kindle Store purchases.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-3">
          <Reveal>
            <h2 className="text-3xl">What you'll discover</h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">{b.discover.map((d) => <li key={d} className="border-b pb-3">✦ {d}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl">Contents</h2>
            <ol className="mt-6 space-y-3 text-muted-foreground">{b.toc.map((t, i) => <li key={t} className="border-b pb-3"><span className="mr-3 text-royal">{String(i + 1).padStart(2, "0")}</span>{t}</li>)}</ol>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-3xl">Details</h2>
            <dl className="mt-6 space-y-3 text-sm">
              {[["Formats", b.formats.join(", ")], ["Language", b.language], ["Pages", b.pages ?? "To be confirmed"], ["Publication", "Not yet published"], ["Author", b.author]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between border-b pb-3"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-royal">Inside this book</p>
          <h2 className="mt-4 text-4xl">A Sample Page</h2>
          <div className="mx-auto mt-10 rounded-sm bg-card px-10 py-14 text-left shadow-xl md:px-16">
            <p className="eyebrow text-center text-[0.6rem] text-muted-foreground">{b.toc[1]}</p>
            <p className="mt-8 font-display text-2xl leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:text-royal">{b.sample}</p>
          </div>
        </Reveal>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl">You may also like</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">{related.map((r) => <BookCard key={r.slug} book={r} />)}</div>
          <div className="mt-10 text-center"><Link to="/bookstore" className="eyebrow text-royal">← Back to bookstore</Link></div>
        </div>
      </section>
    </>
  );
}
