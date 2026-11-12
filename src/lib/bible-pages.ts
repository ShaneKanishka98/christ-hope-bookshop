export type BiblePage = { chapter: number; start: boolean; verses: { n: number; text: string }[] };

/** Fixed design size of one printed page (the whole book is scaled to fit the screen). */
export const PAGE_W = 480;
export const PAGE_H = 680;

const CPL = 60; // average characters per line at the page font size
const LINES = 24; // lines of body text on a page
const SAFETY = 0.9; // keep slack so text never gets cut off
const HEADING_LINES = 6; // space taken by the chapter heading on a chapter's first page

/** Split a book into printed pages. Every chapter starts on a new page. */
export function paginate(chapters: string[][]): BiblePage[] {
  const pages: BiblePage[] = [];
  chapters.forEach((verses, ci) => {
    let cur: BiblePage = { chapter: ci + 1, start: true, verses: [] };
    let used = 0;
    let cap = (LINES - HEADING_LINES) * CPL * SAFETY;
    for (let i = 0; i < verses.length; i++) {
      const text = verses[i] ?? "";
      if (!text) continue; // a few verses are empty in the source text
      const cost = text.length + 4;
      if (used + cost > cap && cur.verses.length > 0) {
        pages.push(cur);
        cur = { chapter: ci + 1, start: false, verses: [] };
        used = 0;
        cap = LINES * CPL * SAFETY;
      }
      cur.verses.push({ n: i + 1, text });
      used += cost;
    }
    pages.push(cur);
  });
  return pages;
}

export type BibleBookText = { slug: string; name: string; testament: "OT" | "NT"; chapters: string[][] };
export type WholePage = {
  slug: string;
  bookName: string;
  testament: "OT" | "NT";
  chapter: number;
  /** a title page that opens a book */
  title?: boolean;
  /** an empty page that keeps each book title on a left-hand page */
  blank?: boolean;
  start?: boolean;
  verses: { n: number; text: string }[];
};

/** Turn the whole Bible into one long run of printed pages. */
export function paginateBible(books: BibleBookText[]): { pages: WholePage[]; starts: Map<string, number> } {
  const pages: WholePage[] = [];
  const starts = new Map<string, number>(); // "slug:chapter" → flip index (cover = 0)
  for (const b of books) {
    if ((pages.length + 1) % 2 === 0) pages.push({ slug: b.slug, bookName: b.name, testament: b.testament, chapter: 1, blank: true, verses: [] });
    starts.set(`${b.slug}:1`, pages.length + 1); // the title page counts as the start of chapter 1
    pages.push({ slug: b.slug, bookName: b.name, testament: b.testament, chapter: 1, title: true, verses: [] });
    for (const p of paginate(b.chapters)) {
      if (p.start && p.chapter > 1) starts.set(`${b.slug}:${p.chapter}`, pages.length + 1);
      pages.push({ slug: b.slug, bookName: b.name, testament: b.testament, chapter: p.chapter, start: p.start, verses: p.verses });
    }
  }
  return { pages, starts };
}
