import { Sun, Moon, Cross, Bird, Heart, BookOpen } from "lucide-react";
import type { Book } from "@/lib/content";

const icons = { sun: Sun, moon: Moon, cross: Cross, dove: Bird, heart: Heart, book: BookOpen };

/**
 * A book cover that scales as one piece: every size (text, icon, spacing) is a share of the cover's own
 * width (container query units), so the title can never spill past the border at any screen size.
 * `fluid` fills its parent; the others have a fixed width.
 */
export function BookCover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" | "fluid" }) {
  const Icon = icons[book.cover.motif];
  const w = size === "lg" ? "w-64 md:w-80" : size === "sm" ? "w-24 sm:w-28" : size === "fluid" ? "w-full" : "w-40 md:w-44";
  return (
    <div className={`book-3d ${w}`}>
      <div className="@container">
        <div
          className="book-inner aspect-[2/3] overflow-hidden rounded-r-md rounded-l-sm"
          style={{ background: `linear-gradient(160deg, ${book.cover.from}, ${book.cover.to})` }}
        >
          <div className="absolute inset-y-0 left-0 w-[4%] bg-midnight/30" />
          <div className="absolute border border-gold/40" style={{ inset: "7cqw" }} />
          <div
            className="relative flex h-full flex-col items-center justify-between text-center text-on-dark"
            style={{ padding: "13cqw 11cqw 11cqw" }}
          >
            <span className="font-semibold uppercase text-gold-light" style={{ fontSize: "5.8cqw", letterSpacing: "0.28em", lineHeight: 1.5 }}>
              Christ<br />Hope
            </span>
            <div className="flex min-h-0 flex-col items-center" style={{ gap: "5cqw" }}>
              <Icon className="text-gold" strokeWidth={1.2} style={{ width: "17cqw", height: "17cqw" }} />
              <h3 className="font-display" style={{ fontSize: "9.6cqw", lineHeight: 1.18 }}>{book.title}</h3>
              <div className="h-px bg-gold/70" style={{ width: "22cqw" }} />
            </div>
            <span className="whitespace-nowrap text-gold-light/80" style={{ fontSize: "4.3cqw", letterSpacing: "0.2em" }}>FAITH • HOPE • LOVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
