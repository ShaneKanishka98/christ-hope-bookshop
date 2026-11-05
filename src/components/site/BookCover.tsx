import { Sun, Moon, Cross, Bird, Heart, BookOpen } from "lucide-react";
import type { Book } from "@/lib/content";

const icons = { sun: Sun, moon: Moon, cross: Cross, dove: Bird, heart: Heart, book: BookOpen };

export function BookCover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" }) {
  const Icon = icons[book.cover.motif];
  const w = size === "lg" ? "w-64 md:w-80" : size === "sm" ? "w-28" : "w-40 md:w-44";
  return (
    <div className={`book-3d ${w}`}>
      <div
        className="book-inner aspect-[2/3] overflow-hidden rounded-r-md rounded-l-sm"
        style={{ background: `linear-gradient(160deg, ${book.cover.from}, ${book.cover.to})` }}
      >
        <div className="absolute inset-y-0 left-0 w-3 bg-midnight/30" />
        <div className="absolute inset-3 border border-gold/40" />
        <div className="relative flex h-full flex-col items-center justify-between px-5 py-7 text-center text-on-dark">
          <span className="eyebrow text-[0.5rem] text-gold-light">Christ Hope</span>
          <div className="flex flex-col items-center gap-3">
            <Icon className="h-7 w-7 text-gold" strokeWidth={1.2} />
            <h3 className={`font-display leading-tight ${size === "lg" ? "text-2xl" : size === "sm" ? "text-[0.7rem]" : "text-base"}`}>
              {book.title}
            </h3>
            <div className="h-px w-10 bg-gold/70" />
          </div>
          <span className="text-[0.55rem] tracking-[0.25em] text-gold-light/80">FAITH • HOPE • LOVE</span>
        </div>
      </div>
    </div>
  );
}
