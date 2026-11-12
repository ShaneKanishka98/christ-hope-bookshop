import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import prayerImg from "@/assets/prayer-light.jpg";
import { getBook, getPrayer, SHOP_ENABLED, prayerImage } from "@/lib/content";
import { ListenButton } from "@/components/site/Listen";
import { SITE_URL, jsonLdScript } from "@/lib/seo";
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
          { property: "og:type", content: "article" },
          { property: "og:image", content: `${SITE_URL}${prayerImage(loaderData.slug)}` },
          { name: "twitter:image", content: `${SITE_URL}${prayerImage(loaderData.slug)}` },
        ]
      : [{ title: "Prayer not found" }, { name: "robots", content: "noindex" }],
    scripts: loaderData
      ? [jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          description: loaderData.text.slice(0, 155),
          articleSection: loaderData.category,
          image: `${SITE_URL}${prayerImage(loaderData.slug)}`,
          mainEntityOfPage: `${SITE_URL}/prayers/${loaderData.slug}`,
          inLanguage: "en",
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        })]
      : [],
  }),
  component: PrayerPage,
});

function PrayerPage() {
  const p = Route.useLoaderData();
  const related = SHOP_ENABLED ? p.related.map(getBook).filter((b) => !!b) : [];
  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} image={prayerImg} />
      <article className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <img src={prayerImage(p.slug)} alt={`Jesus — ${p.category}`} width={820} height={660} className="mb-8 aspect-[5/4] w-full rounded-xl object-cover object-top shadow-gold sm:aspect-[16/10]" />
            <div className="mb-8 flex flex-wrap items-center gap-3 rounded-full border border-gold/30 bg-secondary px-4 py-3">
              <ListenButton text={`${p.title}. ${p.text} ${p.verse}. ${p.ref}.`} label="Listen to this prayer" />
              <span className="text-xs text-muted-foreground">Read aloud in a calm voice</span>
            </div>
            <p className="font-display text-2xl leading-relaxed md:text-3xl">{p.text}</p>
            <div className="mt-12 rounded-xl border-l-4 border-gold bg-secondary p-6 sm:p-8">
              <p className="font-display text-xl italic sm:text-2xl">“{p.verse}”</p>
              <p className="mt-3 text-sm tracking-widest text-royal">{p.ref} · NIV</p>
            </div>
            <div className="mt-10"><CopyShare title={p.title} text={`${p.title}\n\n${p.text}\n\n“${p.verse}” — ${p.ref}`} /></div>
          </Reveal>
        </div>
      </article>
      {!SHOP_ENABLED && (
        <div className="pb-20 text-center"><Link to="/prayers" className="eyebrow text-royal">← All prayers</Link></div>
      )}
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
