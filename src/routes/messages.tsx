import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { Youtube } from "lucide-react";
import { messages, YOUTUBE_URL } from "@/lib/content";
import { PageHero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Jesus Messages — CHRIST HOPE" },
      { name: "description", content: "Inspirational Christian messages: Don't worry about tomorrow, trust God's timing, you are never alone." },
      { property: "og:title", content: "Messages That Touch the Heart — CHRIST HOPE" },
      { property: "og:description", content: "Words of encouragement rooted in the message of Jesus." },
    ],
  }),
  component: Messages,
});

function Messages() {
  return (
    <>
      <PageHero eyebrow="Jesus Messages" title="Messages That Touch the Heart" image={hero} />
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          {messages.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 0.08}>
              <div className="group h-full overflow-hidden rounded-lg bg-card">
                <div className="relative flex aspect-video items-end bg-night p-8 text-on-dark">
                  <img src={hero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" />
                  <h2 className="relative text-4xl">{m.title}</h2>
                </div>
                <div className="p-8">
                  <p className="text-muted-foreground">{m.text}</p>
                  <p className="mt-2 text-sm tracking-widest text-royal">{m.ref}</p>
                  <div className="mt-6 flex flex-wrap gap-5 text-sm">
                    <Link to="/prayers/$slug" params={{ slug: m.prayer }} className="eyebrow text-royal hover:text-gold">Related prayer →</Link>
                    <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center gap-1 text-royal hover:text-gold"><Youtube className="h-4 w-4" />Watch on YouTube</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
