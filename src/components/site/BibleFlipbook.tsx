import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Volume2, VolumeX, ZoomIn } from "lucide-react";
import { PAGE_H, PAGE_W, paginateBible, type BibleBookText, type WholePage } from "@/lib/bible-pages";

type Props = {
  books: BibleBookText[];
  /** printed on the cover and on each book title page, e.g. "KING JAMES VERSION" */
  edition: string;
  bookSlug: string;
  chapter: number;
  /** called when the reader turns into a different book / chapter */
  onLocationChange: (slug: string, chapter: number) => void;
};

/** How many pages around the reader are drawn in full (the rest stay blank until you get close). */
const NEAR = 8;

const Page = forwardRef<HTMLDivElement, { children?: ReactNode; dark?: boolean; hard?: boolean; num?: number | undefined }>(function Page({ children, dark, hard, num }, ref) {
  return (
    <div ref={ref} data-density={hard ? "hard" : "soft"} className={dark ? "bg-[#101a33] text-[#f6dc9a]" : "bg-[#f8f2e5] text-[#2b2118]"} style={{ width: PAGE_W, height: PAGE_H }}>
      <div className="relative h-full w-full overflow-hidden" style={{ boxShadow: dark ? "inset 0 0 0 1px rgba(246,220,154,.25)" : "inset 0 0 40px rgba(120,90,40,.10)" }}>
        <div className="absolute inset-3 border" style={{ borderColor: dark ? "rgba(246,220,154,.35)" : "rgba(160,120,50,.35)" }} />
        {children}
        {num !== undefined && <span className="absolute inset-x-0 bottom-5 text-center font-display text-sm tracking-[0.3em] text-[#9a7a3a]">{num}</span>}
      </div>
    </div>
  );
});

const PageBody = memo(function PageBody({ p, edition }: { p: WholePage; edition: string }) {
  if (p.blank) return null;
  if (p.title) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-10 text-center">
        <p className="text-[0.65rem] tracking-[0.5em] text-[#9a7a3a]">{p.testament === "OT" ? "OLD TESTAMENT" : "NEW TESTAMENT"}</p>
        <div className="my-6 flex items-center gap-3 text-[#b8862d]"><span className="h-px w-12 bg-[#b8862d]/60" /><span className="text-xs">✦</span><span className="h-px w-12 bg-[#b8862d]/60" /></div>
        <h2 className="font-display text-5xl leading-tight tracking-wide">{p.bookName}</h2>
        <div className="my-6 flex items-center gap-3 text-[#b8862d]"><span className="h-px w-12 bg-[#b8862d]/60" /><span className="text-xs">✦</span><span className="h-px w-12 bg-[#b8862d]/60" /></div>
        <p className="text-[0.65rem] tracking-[0.4em] text-[#9a7a3a]">{edition}</p>
      </div>
    );
  }
  return (
    <>
      {!p.start && <p className="absolute inset-x-0 top-6 text-center text-[0.6rem] tracking-[0.4em] text-[#9a7a3a]">{p.bookName.toUpperCase()} · {p.chapter}</p>}
      <div className="absolute inset-x-9 top-10 bottom-12 overflow-hidden">
        {p.start && (
          <div className="mb-5 text-center">
            <p className="text-[0.65rem] tracking-[0.45em] text-[#9a7a3a]">{p.bookName.toUpperCase()}</p>
            <p className="mt-1 font-display text-4xl tracking-[0.15em]">CHAPTER {p.chapter}</p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-3 text-[#b8862d]"><span className="h-px w-10 bg-[#b8862d]/60" /><span className="text-[0.6rem]">✦</span><span className="h-px w-10 bg-[#b8862d]/60" /></div>
          </div>
        )}
        <p className="text-justify font-display text-[16px] leading-[24px]">
          {p.verses.map((v) => (
            <span key={v.n}>
              <sup className="mr-1 align-super font-sans text-[0.55em] font-bold text-[#b8862d]">{v.n}</sup>
              {v.text}{" "}
            </span>
          ))}
        </p>
      </div>
    </>
  );
});

/** Soft paper "swish" made with the Web Audio API — no sound file needed. */
function useFlipSound(enabled: boolean) {
  const ctx = useRef<AudioContext | null>(null);
  return useCallback(() => {
    if (!enabled) return;
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx.current ??= new AC();
      const c = ctx.current;
      const len = Math.floor(c.sampleRate * 0.28);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len) ** 2;
      const src = c.createBufferSource();
      src.buffer = buf;
      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2600;
      const gain = c.createGain();
      gain.gain.value = 0.35;
      src.connect(filter).connect(gain).connect(c.destination);
      src.start();
    } catch { /* audio unavailable */ }
  }, [enabled]);
}

export function BibleFlipbook({ books, edition, bookSlug, chapter, onLocationChange }: Props) {
  const { pages, starts } = useMemo(() => paginateBible(books), [books]);
  const wrap = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const book = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [sound, setSound] = useState(true);
  const [full, setFull] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const playFlip = useFlipSound(sound);

  const portrait = width > 0 && width < 780;
  const designW = portrait ? PAGE_W : PAGE_W * 2;
  const scale = width > 0 ? Math.min(1, (width - 8) / designW) * zoom : 1;
  const filler = (pages.length + 2) % 2 === 1; // keep an even page count so the back cover sits alone

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const on = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);

  const locOf = (idx: number) => {
    const p = pages[Math.min(Math.max(idx, 1), pages.length) - 1];
    return p ? { slug: p.slug, chapter: p.chapter } : { slug: bookSlug, chapter };
  };
  const current = useRef({ slug: bookSlug, chapter });
  current.current = { slug: bookSlug, chapter };

  /** Jump to a page: draw its neighbourhood first, then turn, so it never shows blank. */
  const jump = (target: number) => {
    const pf = book.current?.pageFlip?.();
    if (!pf) return;
    const t = portrait ? target : target - (target % 2 === 1 ? 0 : 1);
    setPageIdx(t);
    window.setTimeout(() => { pf.turnToPage(t); }, 30);
  };

  // The book starts closed on its cover, then the cover swings open to the chosen chapter.
  const opening = useRef(true);
  useEffect(() => {
    if (width === 0) return;
    opening.current = true;
    const t1 = window.setTimeout(() => book.current?.pageFlip?.()?.flipNext(), 650);
    const t2 = window.setTimeout(() => {
      const target = starts.get(`${current.current.slug}:${current.current.chapter}`) ?? 1;
      if (target > 1) jump(target);
      window.setTimeout(() => { opening.current = false; }, 200);
    }, 1700);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portrait, pages.length, width > 0]);

  // a different book / chapter was picked → turn the book to it
  useEffect(() => {
    const target = starts.get(`${bookSlug}:${chapter}`);
    const pf = book.current?.pageFlip?.();
    if (!pf || target === undefined || opening.current) return;
    const here = locOf(pf.getCurrentPageIndex());
    const there = locOf(pf.getCurrentPageIndex() + (portrait ? 0 : 1));
    const same = (l: { slug: string; chapter: number }) => l.slug === bookSlug && l.chapter === chapter;
    if (!same(here) && !same(there)) { jump(target); playFlip(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookSlug, chapter]);

  const flipPrev = () => book.current?.pageFlip?.()?.flipPrev();
  const flipNext = () => book.current?.pageFlip?.()?.flipNext();

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shell.current?.requestFullscreen?.();
  };

  const ctl = "flex h-11 w-11 items-center justify-center rounded-md text-white transition-transform hover:scale-110";
  const arrow = "absolute bottom-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-midnight/80 text-gold shadow-gold backdrop-blur transition-all hover:scale-110 hover:bg-gold hover:text-midnight";

  return (
    <div ref={shell} className={`relative bg-gradient-to-b from-[#e9e6e0] to-[#d5d1c8] ${full ? "flex min-h-screen items-center justify-center" : "rounded-xl"} px-2 pb-16 pt-16 sm:px-4`}>
      <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-lg bg-[oklch(0.58_0.24_27)] px-1.5 py-1 shadow-lg">
        <button className={ctl} aria-label="Zoom" onClick={() => setZoom((z) => (z >= 1.4 ? 1 : +(z + 0.2).toFixed(1)))}><ZoomIn className="h-6 w-6" /></button>
        <button className={ctl} aria-label={full ? "Exit full screen" : "Full screen"} onClick={toggleFull}>{full ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}</button>
        <button className={ctl} aria-label={sound ? "Mute page sound" : "Turn on page sound"} onClick={() => setSound((s) => !s)}>{sound ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}</button>
      </div>

      <div ref={wrap} className="mx-auto w-full max-w-6xl overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        <div style={{ height: PAGE_H * scale, width: designW * scale, margin: "0 auto" }}>
          <div style={{ width: designW, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {width > 0 && (
              <HTMLFlipBook
                key={`${portrait}-${pages.length}`}
                ref={book}
                width={PAGE_W}
                height={PAGE_H}
                size="fixed"
                minWidth={PAGE_W}
                maxWidth={PAGE_W}
                minHeight={PAGE_H}
                maxHeight={PAGE_H}
                startPage={0}
                showCover
                usePortrait
                drawShadow
                maxShadowOpacity={0.5}
                flippingTime={750}
                mobileScrollSupport={false}
                showPageCorners
                useMouseEvents
                swipeDistance={30}
                startZIndex={0}
                autoSize={false}
                clickEventForward={false}
                disableFlipByClick={false}
                className=""
                style={{}}
                onFlip={(e: { data: number }) => {
                  setPageIdx(e.data);
                  playFlip();
                  if (opening.current) return;
                  const left = locOf(e.data);
                  const right = locOf(portrait ? e.data : e.data + 1);
                  const cur = current.current;
                  const same = (l: { slug: string; chapter: number }) => l.slug === cur.slug && l.chapter === cur.chapter;
                  if (e.data === 0 || same(left) || same(right)) return;
                  onLocationChange(left.slug, left.chapter);
                }}
              >
                {[
                  <Page key="cover" dark hard>
                    <div className="flex h-full flex-col items-center justify-center px-10 text-center">
                      <img src="/logo.jpg" alt="" width={110} height={110} className="h-28 w-28 rounded-full border border-[#f6dc9a]/60" />
                      <p className="mt-9 text-[0.7rem] tracking-[0.5em]">THE</p>
                      <h2 className="font-display text-6xl leading-tight tracking-[0.12em] text-[#fff3c4]">HOLY<br />BIBLE</h2>
                      <div className="my-6 flex items-center gap-3"><span className="h-px w-12 bg-[#f6dc9a]/60" /><span className="text-xs">✦</span><span className="h-px w-12 bg-[#f6dc9a]/60" /></div>
                      <p className="text-xs tracking-[0.35em]">OLD &amp; NEW TESTAMENTS</p>
                      <p className="mt-10 text-[0.65rem] tracking-[0.3em] text-[#f6dc9a]/70">{edition} · CHRIST HOPE</p>
                    </div>
                  </Page>,
                  ...pages.map((p, i) => {
                    const near = Math.abs(i + 1 - pageIdx) <= NEAR;
                    return (
                      <Page key={i} num={p.blank ? undefined : i + 1}>
                        {near && <PageBody p={p} edition={edition} />}
                      </Page>
                    );
                  }),
                  ...(filler ? [<Page key="blank" />] : []),
                  <Page key="back" dark hard>
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <span className="text-3xl">✦</span>
                      <p className="mt-6 font-display text-3xl text-[#fff3c4]">The Holy Bible</p>
                      <p className="mt-3 text-xs tracking-[0.3em]">AMEN</p>
                    </div>
                  </Page>,
                ]}
              </HTMLFlipBook>
            )}
          </div>
        </div>
      </div>

      <button className={`${arrow} left-3 sm:left-6`} aria-label="Previous page" onClick={flipPrev}><ChevronLeft className="h-6 w-6" /></button>
      <button className={`${arrow} right-3 sm:right-6`} aria-label="Next page" onClick={flipNext}><ChevronRight className="h-6 w-6" /></button>
      <p className="absolute inset-x-0 bottom-4 text-center text-xs text-[#6b6355]">
        {(() => {
          const a = Math.min(Math.max(pageIdx, 1), pages.length);
          const b = portrait ? a : Math.min(a + 1, pages.length);
          return `${pageIdx === 0 ? "Cover" : a === b ? `Page ${a}` : `Pages ${a}–${b}`} of ${pages.length} · drag a corner or swipe to turn`;
        })()}
      </p>
    </div>
  );
}
