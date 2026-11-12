import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { type Book } from "@/lib/content";
import { BookCover } from "./BookCover";
import { money } from "@/lib/cart";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-night pb-14 pt-32 text-on-dark md:pb-20 md:pt-40">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 to-midnight" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-7xl">{title}</h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-gold"><span className="h-px w-10 bg-gold/60" /><span className="text-xs">✦</span><span className="h-px w-10 bg-gold/60" /></div>
          {text && <p className="mx-auto mt-6 max-w-2xl text-base text-on-dark/75 md:text-lg">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className={`eyebrow ${light ? "text-gold" : "text-royal"}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl ${light ? "text-on-dark" : "text-foreground"}`}>{title}</h2>
      <div className="mx-auto mt-5 h-px w-16 bg-gold" />
      {text && <p className={`mt-5 ${light ? "text-on-dark/70" : "text-muted-foreground"}`}>{text}</p>}
    </Reveal>
  );
}

export function UnpublishedBadge() {
  return (
    <span className="eyebrow inline-block rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-[0.6rem] text-royal">
      Demo · Unpublished
    </span>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to="/bookstore/$slug"
      params={{ slug: book.slug }}
      className="group flex h-full flex-col items-center rounded-xl border border-border/70 bg-card p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-gold sm:p-8"
    >
      <div className="flex h-64 items-center sm:h-72">
        <BookCover book={book} />
      </div>
      <UnpublishedBadge />
      <p className="eyebrow mt-4 text-[0.6rem] text-muted-foreground">{book.category}</p>
      <h3 className="mt-2 text-2xl leading-tight group-hover:text-royal">{book.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{book.description}</p>
      <div className="mt-5 flex items-center gap-3 text-sm">
        <span className="font-display text-2xl text-foreground">{money(book.price)}</span>
        <span className="text-muted-foreground">{book.formats.join(" · ")}</span>
      </div>
    </Link>
  );
}

export function CopyShare({ text, title }: { text: string; title: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, text, url: location.href }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${location.href}`);
      toast.success("Link copied — ready to share");
    }
  };
  return (
    <div className="flex gap-2">
      <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-gold"><Copy className="h-4 w-4" />Copy</button>
      <button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-gold"><Share2 className="h-4 w-4" />Share</button>
    </div>
  );
}

export const goldBtn = "inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-midnight shadow-gold transition-transform hover:-translate-y-0.5";
export const ghostBtn = "inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-on-dark transition-colors hover:bg-gold/10";
export const navyBtn = "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-royal";

export const youtubeBtn = "inline-flex items-center justify-center gap-2 rounded-full bg-youtube px-7 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-youtube-foreground shadow-youtube transition-all hover:-translate-y-0.5 hover:bg-youtube-dark";
