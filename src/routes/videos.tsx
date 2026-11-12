import { createFileRoute } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import hero from "@/assets/hero-sunrise-cross.jpg";
import { YOUTUBE_URL, messages, shortVideos as shorts, miracleVideo } from "@/lib/content";
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
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="eyebrow text-gold">YouTube Shorts</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">Daily Encouragements</h2>
          <div className="mx-auto mt-10 grid max-w-xs gap-6 sm:max-w-none sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {shorts.map((id, i) => (
              <Reveal key={id} delay={(i % 3) * 0.08}>
                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-gold/20 bg-midnight shadow-card">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`}
                    title={`Daily Encouragement ${i + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="h-full w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <p className="eyebrow mt-20 text-gold">Featured Video</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl">Christian Miracles</h2>
          <Reveal className="mx-auto mt-10 max-w-4xl">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-gold/20 bg-midnight shadow-card">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${miracleVideo}?rel=0`}
                title="Christian Miracles"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
          </Reveal>
          <div className="mx-auto mt-20 max-w-5xl">
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
        </div>
      </section>
    </>
  );
}
