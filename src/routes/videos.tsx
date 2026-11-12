import { createFileRoute } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { YOUTUBE_URL, messages } from "@/lib/content";
import { PageHero, Reveal, youtubeBtn } from "@/components/site/ui";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — CHRIST HOPE Media" },
      { name: "description", content: "Watch prayers, Jesus messages and Scripture from the official CHRIST HOPE Media YouTube channel." },
      { property: "og:title", content: "CHRIST HOPE Media Videos" },
      { property: "og:description", content: "Prayers and Christian encouragement on YouTube." },
    ],
  }),
  component: Videos,
});

function Videos() {
  return (
    <>
      <PageHero eyebrow="Christ Hope Media" title="Watch & Be Encouraged" text="Prayers, Jesus messages and Scripture from our official YouTube channel." image={hero} />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-lg">
              <img src={hero} alt="CHRIST HOPE Media channel" loading="lazy" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight/50 text-on-dark">
                <span className="flex h-16 w-24 items-center justify-center rounded-2xl bg-youtube shadow-youtube transition-transform group-hover:scale-110"><Youtube className="h-9 w-9 text-youtube-foreground" /></span>
                <p className="mt-4 px-4 font-display text-2xl sm:text-3xl">Visit @ChristHopeMediaOfficial</p>
              </div>
            </a>
          </Reveal>
          <a href={`${YOUTUBE_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className={`${youtubeBtn} mt-10`}><Youtube className="h-4 w-4" />Subscribe on YouTube</a>
          <h2 className="mt-16 text-3xl sm:text-4xl md:mt-24">Topics we share</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {messages.map((m) => <span key={m.title} className="rounded-full border border-border px-5 py-2 font-display text-lg">{m.title}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
