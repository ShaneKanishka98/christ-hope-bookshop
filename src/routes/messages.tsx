import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { Youtube } from "lucide-react";
import { messages, YOUTUBE_URL } from "@/lib/content";
import { PageHero, Reveal } from "@/components/site/ui";
import { MessageArt } from "@/components/site/MessageArt";
import { ListenButton } from "@/components/site/Listen";

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
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          {messages.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                <div className="relative aspect-video overflow-hidden bg-night text-on-dark">
                  <MessageArt index={i} className="absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/20 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-gold/60 bg-midnight/40 px-3 py-1 text-[0.65rem] tracking-[0.25em] text-gold-light backdrop-blur">{m.ref}</span>
                  <h2 className="absolute inset-x-0 bottom-0 p-6 text-3xl leading-tight drop-shadow sm:p-8 sm:text-4xl">{m.title}</h2>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="font-display text-xl italic text-muted-foreground">“{m.text}”</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                    <ListenButton text={`${m.title}. ${m.text} ${m.ref}.`} />
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
