import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Swipeable carousel of YouTube Shorts with arrow buttons, edge fades and a progress bar. */
export function ShortsCarousel({ ids }: { ids: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  const arrow = "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-midnight/80 text-gold shadow-gold backdrop-blur transition-all hover:scale-110 hover:bg-gold hover:text-midnight disabled:pointer-events-none disabled:opacity-0 md:flex";

  return (
    <div className="relative mt-8">
      <button type="button" aria-label="Previous videos" onClick={() => go(-1)} disabled={atStart} className={`${arrow} -left-2 lg:-left-6`}>
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button type="button" aria-label="Next videos" onClick={() => go(1)} disabled={atEnd} className={`${arrow} -right-2 lg:-right-6`}>
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* edge fades */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-[5] w-10 bg-gradient-to-r from-night to-transparent transition-opacity ${atStart ? "opacity-0" : "opacity-100"}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-[5] w-10 bg-gradient-to-l from-night to-transparent transition-opacity ${atEnd ? "opacity-0" : "opacity-100"}`} />

      <div
        ref={track}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ids.map((id, i) => (
          <div key={id} className="group aspect-[9/16] w-[15.5rem] shrink-0 snap-center overflow-hidden rounded-2xl border border-gold/25 bg-midnight shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-gold sm:w-64 lg:w-[17rem]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`}
              title={`Daily Encouragement ${i + 1}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
        ))}
      </div>

      {/* progress bar + counter */}
      <div className="mx-auto mt-5 flex max-w-sm items-center gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-on-dark/15">
          <div className="h-full rounded-full bg-gold-gradient transition-[width] duration-200" style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
        <span className="text-xs tracking-widest text-gold-light">{ids.length} VIDEOS</span>
      </div>
      <p className="mt-3 text-center text-xs text-on-dark/50 md:hidden">Swipe to see more →</p>
    </div>
  );
}
