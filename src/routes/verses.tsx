import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { verses, verseOfTheDay } from "@/lib/content";
import { CopyShare, PageHero, Reveal } from "@/components/site/ui";

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

const cats = ["All", ...Array.from(new Set(verses.map((v) => v.category)))];

function Verses() {
  const [cat, setCat] = useState("All");
  const vod = verseOfTheDay();
  const list = cat === "All" ? verses : verses.filter((v) => v.category === cat);
  return (
    <>
      <PageHero eyebrow="Verse of the Day" title={`“${vod.text}”`} text={`${vod.ref} · New International Version`} />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {list.map((v) => (
              <Reveal key={v.ref}>
                <div className="h-full rounded-lg border border-border bg-card p-8">
                  <p className="eyebrow text-royal">{v.category}</p>
                  <p className="mt-4 font-display text-2xl leading-snug">“{v.text}”</p>
                  <p className="mt-3 text-sm tracking-widest text-muted-foreground">{v.ref} · NIV</p>
                  <div className="mt-6"><CopyShare title={v.ref} text={`“${v.text}” — ${v.ref} (NIV)`} /></div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-center text-xs text-muted-foreground">Scripture quotations taken from the Holy Bible, New International Version® (NIV®).</p>
        </div>
      </section>
    </>
  );
}
