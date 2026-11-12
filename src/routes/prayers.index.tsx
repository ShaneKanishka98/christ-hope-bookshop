import { createFileRoute, Link } from "@tanstack/react-router";
import prayerImg from "@/assets/prayer-light.jpg";
import { prayers, jesusImage } from "@/lib/content";
import { Sunrise, Moon, Bird, HeartPulse, Shield, Users, Flame, Sparkles, Compass, CloudRain, Volume2, type LucideIcon } from "lucide-react";
import { PageHero, Reveal } from "@/components/site/ui";

const icons: Record<string, LucideIcon> = {
  "morning-prayer": Sunrise, "evening-prayer": Moon, "prayer-for-peace": Bird, "prayer-for-healing": HeartPulse,
  "prayer-for-protection": Shield, "prayer-for-family": Users, "prayer-for-strength": Flame,
  "prayer-for-hope": Sparkles, "prayer-for-guidance": Compass, "prayer-for-difficult-times": CloudRain,
};

export const Route = createFileRoute("/prayers/")({
  head: () => ({
    meta: [
      { title: "Daily Prayers — CHRIST HOPE" },
      { name: "description", content: "Morning, evening, healing, peace and protection prayers to pray with us every day." },
      { property: "og:title", content: "Pray With Us Every Day — CHRIST HOPE" },
      { property: "og:description", content: "A library of heartfelt prayers with Scripture for every need." },
    ],
  }),
  component: Prayers,
});

function Prayers() {
  return (
    <>
      <PageHero eyebrow="Daily Prayers" title="Pray With Us Every Day" text="Heartfelt prayers, each paired with Scripture, for every moment of life." image={prayerImg} />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {prayers.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <Link to="/prayers/$slug" params={{ slug: p.slug }} className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold">
                <span className="relative block aspect-[5/4] overflow-hidden bg-night">
                  <img src={jesusImage(i)} alt={`Jesus — ${p.category}`} loading="lazy" width={820} height={660} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-midnight/70 text-gold backdrop-blur transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {(() => { const Icon = icons[p.slug] ?? Sparkles; return <Icon className="h-5 w-5" strokeWidth={1.4} />; })()}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="eyebrow block text-royal">{p.category}</span>
                  <span className="mt-2 block font-display text-2xl leading-tight group-hover:text-royal">{p.title}</span>
                  <span className="mt-3 line-clamp-2 block text-muted-foreground">{p.text}</span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
                    <span className="italic text-muted-foreground">— {p.ref}</span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-royal"><Volume2 className="h-4 w-4" />Listen</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
