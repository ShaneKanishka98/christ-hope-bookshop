import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { PageHero, Reveal, goldBtn } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CHRIST HOPE — Our Mission" },
      { name: "description", content: "CHRIST HOPE shares the love and message of Jesus Christ through prayers, Scripture, messages and Christian books." },
      { property: "og:title", content: "About CHRIST HOPE" },
      { property: "og:description", content: "Sharing faith. Inspiring hope. Spreading love." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About Christ Hope" title="Sharing Faith. Inspiring Hope. Spreading Love." image={hero} />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8 px-6 font-display text-2xl leading-relaxed md:text-3xl">
          <Reveal><p>CHRIST HOPE exists to share the love and message of Jesus Christ through meaningful prayers, Scripture, inspirational messages and Christian books.</p></Reveal>
          <Reveal><p>Our mission is to bring comfort to hearts, encouragement to difficult moments and hope to people around the world.</p></Reveal>
          <Reveal><p className="text-royal">Through faith, prayer and love, we hope to inspire everyone to grow closer to God.</p></Reveal>
          <Reveal className="pt-6 text-center"><Link to="/prayers" className={goldBtn}>Pray with us</Link></Reveal>
        </div>
      </section>
      <section className="bg-night py-20 text-on-dark">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 text-center md:grid-cols-3">
          {[["Faith", "Trusting God in every season."], ["Hope", "An anchor for the soul."], ["Love", "The greatest of these."]].map(([t, d]) => (
            <Reveal key={t}><h3 className="text-4xl text-gold-gradient sm:text-5xl">{t}</h3><p className="mt-3 text-on-dark/70">{d}</p></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
