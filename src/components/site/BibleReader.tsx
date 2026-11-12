import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { bibleBooks, drcBooks, type BibleBook } from "@/lib/bible-books";
import { BibleFlipbook } from "./BibleFlipbook";

export type BibleVersion = "kjv" | "drc";

const versions: Record<BibleVersion, { label: string; edition: string; books: BibleBook[]; dir: string; credit: string }> = {
  kjv: { label: "King James · 66 books", edition: "KING JAMES VERSION", books: bibleBooks, dir: "/bible", credit: "Holy Bible · King James Version (public domain)" },
  drc: { label: "Catholic · Douay-Rheims · 73 books", edition: "CATHOLIC · DOUAY-RHEIMS", books: drcBooks, dir: "/bible/drc", credit: "Catholic Holy Bible · Douay-Rheims, Challoner revision (public domain) · Psalm numbering follows the Latin Vulgate" },
};

function useWholeBible(version: BibleVersion) {
  const { books, dir } = versions[version];
  return useQuery({
    queryKey: ["bible", version],
    queryFn: async () =>
      Promise.all(
        books.map(async (b) => {
          const r = await fetch(`${dir}/${b.slug}.json`);
          if (!r.ok) throw new Error(`Could not load ${b.name}`);
          return { slug: b.slug, name: b.name, testament: b.testament, chapters: (await r.json()) as string[][] };
        }),
      ),
    staleTime: Infinity,
  });
}

/** The complete Holy Bible as one page-turning book, in the King James or the Catholic (Douay-Rheims) version. */
export function BibleReader({ bookSlug, chapter, onLocationChange }: { bookSlug: string; chapter: number; onLocationChange: (slug: string, chapter: number) => void }) {
  // a link to a Catholic-only book (Tobit, Judith, Wisdom…) opens the Catholic Bible
  const [version, setVersion] = useState<BibleVersion>(() => (bibleBooks.some((b) => b.slug === bookSlug) ? "kjv" : "drc"));
  const { data, isPending, isError, refetch } = useWholeBible(version);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const v = versions[version];
  const cur = v.books.find((b) => b.slug === bookSlug) ?? v.books[0]!;
  const list = v.books.filter((b) => b.testament === cur.testament);
  const sel = "min-w-0 rounded-full border border-gold/40 bg-midnight px-4 py-2 text-sm text-on-dark focus:border-gold focus:outline-none";

  const switchVersion = (next: BibleVersion) => {
    if (next === version) return;
    const nb = versions[next].books;
    const same = nb.find((b) => b.slug === bookSlug);
    setVersion(next);
    if (same) onLocationChange(same.slug, Math.min(chapter, same.chapters));
    else onLocationChange(nb[0]!.slug, 1);
  };

  return (
    <div className="bg-background">
      <div className="h-[4.6rem] bg-midnight sm:h-24" />
      {/* main filter */}
      <div className="sticky top-[3.6rem] z-30 border-b border-gold/15 bg-midnight/95 text-on-dark backdrop-blur sm:top-[4.1rem]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 py-3 sm:gap-3">
          <select aria-label="Bible version" value={version} onChange={(e) => switchVersion(e.target.value as BibleVersion)} className={`${sel} w-full sm:w-auto`}>
            {(Object.keys(versions) as BibleVersion[]).map((k) => <option key={k} value={k}>{versions[k].label}</option>)}
          </select>
          <div className="flex rounded-full border border-gold/40 p-0.5" role="tablist" aria-label="Testament">
            {(["OT", "NT"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={cur.testament === t}
                onClick={() => { if (cur.testament !== t) onLocationChange(v.books.find((b) => b.testament === t)!.slug, 1); }}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${cur.testament === t ? "bg-gold-gradient text-midnight" : "text-on-dark/70 hover:text-gold"}`}
              >
                {t === "OT" ? "Old Testament" : "New Testament"}
              </button>
            ))}
          </div>
          <select aria-label="Book" value={cur.slug} onChange={(e) => onLocationChange(e.target.value, 1)} className={`${sel} flex-1 sm:flex-none`}>
            {list.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
          <select aria-label="Chapter" value={chapter} onChange={(e) => onLocationChange(cur.slug, Number(e.target.value))} className={sel}>
            {Array.from({ length: cur.chapters }, (_, i) => i + 1).map((n) => <option key={n} value={n}>Chapter {n}</option>)}
          </select>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-2 pb-14 pt-6 sm:px-4">
        {(isPending || !mounted) && <p className="py-24 text-center text-muted-foreground">Opening the Holy Bible…</p>}
        {isError && (
          <p className="py-24 text-center text-muted-foreground">Could not load the Bible. <button className="text-royal underline" onClick={() => void refetch()}>Try again</button></p>
        )}
        {mounted && data && <BibleFlipbook key={version} edition={v.edition} books={data} bookSlug={cur.slug} chapter={chapter} onLocationChange={onLocationChange} />}
        <p className="mt-4 text-center text-xs text-muted-foreground">{v.credit}</p>
      </section>
    </div>
  );
}
