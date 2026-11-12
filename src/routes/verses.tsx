import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Cross, Flame, HandHeart, Heart, Shield, Sparkles, Sunrise, Bird, Quote, type LucideIcon } from "lucide-react";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { verses, verseOfTheDay, jesusImage } from "@/lib/content";
import { CopyShare, PageHero, Reveal } from "@/components/site/ui";
import { ListenButton } from "@/components/site/Listen";

export const Route = createFileRoute("/verses")({
  head: () => ({
    meta: [
      { title: "Bible Verses — CHRIST HOPE" },
      { name: "description", content: "Bible verses on faith, hope, love, peace, strength, forgiveness, courage and God's promises (NIV)." },
      { property: "og:title", content: "Daily Scripture — CHRIST HOPE" },
      { property: "og:description", content: "Beautiful Bible verses for every season, with a daily featured verse." },
    ],
  }),
  component: Verses,
});

type Theme = { icon: LucideIcon; from: string; to: string; glow: string };
const themes: Record<string, Theme> = {
  Faith: { icon: Cross, from: "#16306b", to: "#0b1433", glow: "#7fb6e8" },
  Hope: { icon: Sunrise, from: "#b4582f", to: "#3a1d4f", glow: "#ffd58a" },
  Love: { icon: Heart, from: "#8f2a4a", to: "#2b1033", glow: "#ffb3c4" },
  Peace: { icon: Bird, from: "#1d6a7a", to: "#0d2a4a", glow: "#bff3ec" },
  Strength: { icon: Flame, from: "#5a2a8a", to: "#150a2a", glow: "#e0c2ff" },
  Forgiveness: { icon: HandHeart, from: "#9a7326", to: "#3a2250", glow: "#fff0b8" },
  Courage: { icon: Shield, from: "#8a2f2a", to: "#1c1030", glow: "#ffc59a" },
  "God's Promises": { icon: Sparkles, from: "#2a3a8a", to: "#0a1030", glow: "#f6dc9a" },
};
const fallback: Theme = { icon: BookOpen, from: "#1d2b5a", to: "#0b1433", glow: "#f6dc9a" };

const cats = ["All", ...Array.from(new Set(verses.map((v) => v.category)))];

function Verses() {
  const [cat, setCat] = useState("All");
  const vod = verseOfTheDay();
  const list = useMemo(() => (cat === "All" ? verses : verses.filter((v) => v.category === cat)), [cat]);
  const counts = useMemo(() => Object.fromEntries(cats.map((c) => [c, c === "All" ? verses.length : verses.filter((v) => v.category === c).length])), []);

  return (
    <>
      <PageHero eyebrow="Daily Scripture" title="Words of Life" text="Verses to hold onto — for every season, every worry and every joy." image={hero} />

      {/* Verse of the day */}
      <section className="relative -mt-10 pb-6 sm:-mt-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <div className="relative grid overflow-hidden rounded-2xl border border-gold/40 bg-night text-on-dark shadow-gold md:grid-cols-5">
              <div className="relative min-h-56 md:col-span-2">
                <img src={jesusImage(1)} alt="Jesus" loading="lazy" width={820} height={660} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-night" />
              </div>
              <div className="relative p-7 sm:p-10 md:col-span-3">
                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-glow opacity-30" />
                <p className="eyebrow inline-flex items-center gap-2 text-gold"><Sparkles className="h-4 w-4" />Verse of the Day</p>
                <Quote className="mt-5 h-8 w-8 text-gold/70" strokeWidth={1.2} />
                <blockquote className="mt-3 font-display text-2xl leading-snug sm:text-3xl md:text-[2rem]">{vod.text}</blockquote>
                <p className="mt-5 text-sm tracking-widest text-gold-light">{vod.ref} · NIV</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <ListenButton text={`${vod.text} ${vod.ref}.`} label="Listen" />
                  <CopyShare title={vod.ref} text={`“${vod.text}” — ${vod.ref} (NIV)`} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-20 pt-10 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {cats.map((c) => {
              const t = themes[c];
              const Icon = c === "All" ? BookOpen : (t ?? fallback).icon;
              const on = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${on ? "border-transparent bg-night text-gold-light shadow-gold" : "border-border bg-card hover:-translate-y-0.5 hover:border-gold"}`}
                >
                  <Icon className={`h-4 w-4 ${on ? "text-gold" : "text-royal"}`} strokeWidth={1.6} />
                  {c}
                  <span className={`rounded-full px-1.5 text-xs ${on ? "bg-gold/20 text-gold-light" : "bg-secondary text-muted-foreground"}`}>{counts[c]}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
            {list.map((v, i) => {
              const t = themes[v.category] ?? fallback;
              const Icon = t.icon;
              return (
                <Reveal key={v.ref} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/10 p-7 text-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-gold sm:p-8"
                    style={{ background: `linear-gradient(155deg, ${t.from}, ${t.to})` }}
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: t.glow }} />
                    <Quote className="pointer-events-none absolute -bottom-4 right-3 h-28 w-28 rotate-180 opacity-[0.07]" strokeWidth={1} />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur"><Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: t.glow }} /></span>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: t.glow }}>{v.category}</span>
                    </div>
                    <p className="relative mt-6 font-display text-2xl leading-snug sm:text-[1.65rem]">“{v.text}”</p>
                    <div className="relative mt-5 flex items-center gap-3">
                      <span className="h-px w-8" style={{ background: t.glow }} />
                      <p className="text-sm tracking-widest text-white/80">{v.ref} · NIV</p>
                    </div>
                    <div className="relative mt-6 flex flex-wrap items-center gap-2 [&_button]:px-3.5 [&_button]:py-2 [&_button]:text-[0.8rem] [&_button]:border-white/30 [&_button]:text-white [&_button:hover]:border-gold">
                      <ListenButton text={`${v.text} ${v.ref}.`} label="Listen" />
                      <CopyShare title={v.ref} text={`“${v.text}” — ${v.ref} (NIV)`} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Scripture quotations taken from the Holy Bible, New International Version® (NIV®).</p>
        </div>
      </section>
    </>
  );
}
