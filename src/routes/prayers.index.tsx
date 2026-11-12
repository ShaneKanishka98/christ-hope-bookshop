import { createFileRoute, Link } from "@tanstack/react-router";
import prayerImg from "@/assets/prayer-light.jpg";
import { prayers } from "@/lib/content";
import { PageHero, Reveal } from "@/components/site/ui";

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
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {prayers.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <Link to="/prayers/$slug" params={{ slug: p.slug }} className="group block h-full rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-gold">
                <p className="eyebrow text-royal">{p.category}</p>
                <h2 className="mt-3 text-3xl group-hover:text-royal">{p.title}</h2>
                <p className="mt-3 line-clamp-2 text-muted-foreground">{p.text}</p>
                <p className="mt-4 text-sm italic text-muted-foreground">— {p.ref}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
