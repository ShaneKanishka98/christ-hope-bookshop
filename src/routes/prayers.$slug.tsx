import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import prayerImg from "@/assets/prayer-light.jpg";
import { getBook, getPrayer } from "@/lib/content";
import { BookCard, CopyShare, PageHero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/prayers/$slug")({
  loader: ({ params }) => {
    const prayer = getPrayer(params.slug);
    if (!prayer) throw notFound();
    return prayer;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — CHRIST HOPE` },
          { name: "description", content: loaderData.text.slice(0, 155) },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.text.slice(0, 155) },
        ]
      : [{ title: "Prayer not found" }, { name: "robots", content: "noindex" }],
  }),
  component: PrayerPage,
});

function PrayerPage() {
  const p = Route.useLoaderData();
  const related = p.related.map(getBook).filter((b) => !!b);
  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} image={prayerImg} />
      <article className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed md:text-3xl">{p.text}</p>
            <div className="mt-12 border-l-2 border-gold pl-6">
              <p className="font-display text-xl italic">“{p.verse}”</p>
              <p className="mt-2 text-sm tracking-widest text-royal">{p.ref} · NIV</p>
            </div>
            <div className="mt-10"><CopyShare title={p.title} text={`${p.title}\n\n${p.text}\n\n“${p.verse}” — ${p.ref}`} /></div>
          </Reveal>
        </div>
      </article>
      {related.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="font-display text-2xl italic text-muted-foreground">Continue your daily prayer journey with our CHRIST HOPE prayer books.</p>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">{related.map((b) => <BookCard key={b.slug} book={b} />)}</div>
            <Link to="/prayers" className="eyebrow mt-10 inline-block text-royal">← All prayers</Link>
          </div>
        </section>
      )}
    </>
  );
}
