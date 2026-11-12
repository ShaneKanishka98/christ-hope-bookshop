import { SHOP_ENABLED } from "@/lib/content";
import { redirect, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { books, categories } from "@/lib/content";
import { BookCard, PageHero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/bookstore/")({
  beforeLoad: () => { if (!SHOP_ENABLED) throw redirect({ to: "/" }); },
  head: () => ({
    meta: [
      { title: "Christ Hope Bookstore — Prayer Books & Devotionals" },
      { name: "description", content: "Words of faith, books of hope. Christian prayer books and devotionals in EPUB and PDF from CHRIST HOPE." },
      { property: "og:title", content: "Christ Hope Bookstore" },
      { property: "og:description", content: "Beautiful prayer books and Christian devotionals to inspire your heart." },
    ],
  }),
  component: Bookstore,
});

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

function Bookstore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let l = books.filter((b) => (cat === "All" || b.category === cat) && (b.title + b.description).toLowerCase().includes(q.toLowerCase()));
    if (sort === "newest") l = [...l].sort((a, b) => b.added.localeCompare(a.added));
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "featured") l = [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return l;
  }, [q, cat, sort]);

  return (
    <>
      <PageHero eyebrow="Christ Hope Bookstore" title="Words of Faith. Books of Hope." text="Discover beautiful prayer books and Christian devotionals designed to inspire your heart, strengthen your faith and bring you closer to God." />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-lg border border-gold/40 bg-gold/10 p-4 text-center text-sm text-foreground">
            These titles are proposed demo concepts and are not yet published. Purchasing opens once real book files are added and listings approved.
          </div>
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books…" className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-5 focus:border-gold focus:outline-none" />
            </label>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full border border-border bg-card px-5 py-3">
              <option>All</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-full border border-border bg-card px-5 py-3">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((b, i) => <Reveal key={b.slug} delay={(i % 4) * 0.06}><BookCard book={b} /></Reveal>)}
          </div>
          {list.length === 0 && <p className="mt-16 text-center text-muted-foreground">No books match your search.</p>}
        </div>
      </section>
    </>
  );
}
