import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Youtube, Cross, Sunrise, Heart, BookOpen, BookMarked, HandHeart, Quote } from "lucide-react";
import hero from "@/assets/hero-sunrise-cross.jpg";
import prayerImg from "@/assets/prayer-light.jpg";
import { books, prayers, messages, verseOfTheDay, YOUTUBE_URL, SHOP_ENABLED, shortVideos, miracleVideo } from "@/lib/content";
import { BookCard, Reveal, SectionTitle, goldBtn, ghostBtn, navyBtn, youtubeBtn } from "@/components/site/ui";
import { BookCover } from "@/components/site/BookCover";
import { ShortsCarousel } from "@/components/site/ShortsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHRIST HOPE Media — Daily Prayers, Jesus Messages & the Holy Bible" },
      { name: "description", content: "Pray with us every day. Daily Christian prayers with voice, Jesus messages, Bible verses, YouTube videos and the complete Holy Bible (KJV and Catholic Douay-Rheims) to read online for free." },
      { property: "og:title", content: "CHRIST HOPE — Faith • Hope • Love" },
      { property: "og:description", content: "Where faith finds strength, hope comes alive, and love leads the way." },
    ],
  }),
  component: Home,
});

function Home() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 180]);
  const verse = verseOfTheDay();
  const featured = books.filter((b) => b.featured);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 text-on-dark">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={hero} alt="Wooden cross on a mountain at sunrise" width={1920} height={1088} className="h-full w-full object-cover animate-slow-zoom" />
        </motion.div>
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto max-w-4xl px-5 pt-28 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative mx-auto mb-8 h-24 w-24 sm:h-28 sm:w-28">
            <div className="absolute -inset-10 rounded-full bg-glow animate-halo" />
            <img src="/logo.jpg" alt="CHRIST HOPE logo" width={176} height={176} className="relative h-full w-full rounded-full gold-ring animate-float" />
          </motion.div>
          <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.32em" }} transition={{ duration: 1.6 }} className="eyebrow text-gold-light">
            Faith • Hope • Love
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="mt-5 text-[2.6rem] leading-none tracking-[0.08em] sm:text-6xl sm:tracking-[0.12em] md:text-8xl">
            CHRIST <span className="text-gold-gradient">HOPE</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.9 }} className="mx-auto mt-6 max-w-2xl font-display text-xl italic sm:mt-8 sm:text-2xl md:text-3xl">
            “Where Faith Finds Strength, Hope Comes Alive, and Love Leads the Way.”
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mx-auto mt-5 max-w-xl text-sm text-on-dark/80 sm:mt-6 sm:text-base">
            Discover daily prayers, inspiring messages, Scripture and beautiful Christian books created to bring faith, peace and hope into your life.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.6 }} className="mx-auto mt-9 flex max-w-xs flex-col justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <Link to="/bible" className={goldBtn}><BookOpen className="h-4 w-4" />Read the Holy Bible</Link>
            <a href={`${YOUTUBE_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className={youtubeBtn}><Youtube className="h-4 w-4" />Watch on YouTube</a>
            <Link to="/about" className={ghostBtn}>Explore Christ Hope</Link>
            {SHOP_ENABLED && <Link to="/bookstore" className={ghostBtn}>Discover our Bookstore</Link>}
          </motion.div>
        </div>
      </section>

      {/* Verse of the day */}
      <section className="relative overflow-hidden bg-night py-16 text-on-dark md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow opacity-40" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <Quote className="mx-auto h-8 w-8 text-gold/70" strokeWidth={1.2} />
          <p className="eyebrow mt-4 text-gold">Verse of the Day</p>
          <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl md:text-4xl">“{verse.text}”</blockquote>
          <p className="mt-5 text-sm tracking-widest text-gold-light">{verse.ref} · NIV</p>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="relative bg-midnight py-12 text-on-dark md:py-16">
        <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 ${SHOP_ENABLED ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {[
            { icon: HandHeart, title: "Daily Prayers", text: "Prayers for every season of life.", to: "/prayers" as const },
            { icon: Cross, title: "Jesus Messages", text: "Words that touch the heart.", to: "/messages" as const },
            { icon: Sunrise, title: "Bible Verses", text: "Scripture for every need.", to: "/verses" as const },
            { icon: BookMarked, title: "Holy Bible", text: "Read all 66 books, free.", to: "/bible" as const },
            { icon: BookOpen, title: "Bookstore", text: "Books of faith and hope.", to: "/bookstore" as const },
          ].filter((c) => SHOP_ENABLED || c.to !== "/bookstore").map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link to={c.to} className="group flex h-full flex-col items-center rounded-xl border border-gold/20 bg-navy/60 px-4 py-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:bg-navy sm:py-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-midnight sm:h-14 sm:w-14">
                  <c.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl">{c.title}</h3>
                <p className="mt-1 text-xs text-on-dark/60 sm:text-sm">{c.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bookstore */}
      {SHOP_ENABLED && <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Christ Hope Bookstore" title="Words of Faith. Books of Hope." text="Beautiful prayer books and Christian devotionals designed to inspire your heart and bring you closer to God." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-16 md:gap-8 lg:grid-cols-4">
            {featured.map((b, i) => <Reveal key={b.slug} delay={i * 0.1}><BookCard book={b} /></Reveal>)}
          </div>
          <div className="mt-10 text-center md:mt-14"><Link to="/bookstore" className={navyBtn}>Browse all books <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>}

      {/* Holy Bible */}
      <section className="relative overflow-hidden py-16 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow text-royal">The Holy Bible</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Read the Whole Bible, Free</h2>
            <p className="mt-5 text-muted-foreground">All 66 books of the King James Version in one place. Pick a book, tap a chapter, then swipe from page to page — the next chapter opens automatically.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/bible" className={navyBtn}>Open the Bible <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/bible/$book/$chapter" params={{ book: "john", chapter: "3" }} className="inline-flex items-center rounded-full border border-border px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:border-gold">John 3</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[["Genesis", "genesis", "1"], ["Psalms", "psalms", "23"], ["Proverbs", "proverbs", "3"], ["Matthew", "matthew", "5"], ["John", "john", "1"], ["Romans", "romans", "8"]].map(([name, slug, ch]) => (
                <Link key={slug} to="/bible/$book/$chapter" params={{ book: slug!, chapter: ch! }} className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-gold/70 hover:shadow-gold">
                  <BookMarked className="h-5 w-5 text-gold" strokeWidth={1.4} />
                  <p className="mt-3 font-display text-xl">{name}</p>
                  <p className="text-xs text-muted-foreground">Chapter {ch}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* YouTube */}
      <section className="relative overflow-hidden bg-night py-16 text-on-dark md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-glow opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionTitle light eyebrow="From Our YouTube Channel" title="Watch & Be Encouraged" text="Prayers, miracles and daily encouragements from CHRIST HOPE Media." />
          <Reveal className="mx-auto mt-10 max-w-4xl md:mt-14">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-gold/30 bg-midnight shadow-gold">
              <iframe src={`https://www.youtube-nocookie.com/embed/${miracleVideo}?rel=0`} title="Christian Miracles" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full" />
            </div>
            <p className="eyebrow mt-4 text-center text-gold">Christian Miracles</p>
          </Reveal>
          <h3 className="mt-14 text-center text-2xl sm:text-3xl">Daily Encouragements</h3>
          <ShortsCarousel ids={shortVideos} />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`${YOUTUBE_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className={youtubeBtn}><Youtube className="h-4 w-4" />Subscribe on YouTube</a>
            <Link to="/videos" className={ghostBtn}>See all videos</Link>
          </div>
        </div>
      </section>

      {/* Prayers */}
      <section className="relative overflow-hidden bg-midnight text-on-dark">
        <div className="grid lg:grid-cols-2">
          <img src={prayerImg} alt="Open Bible by candlelight at sunset" loading="lazy" width={1600} height={1008} className="h-64 w-full object-cover sm:h-80 lg:h-full" />
          <div className="px-6 py-14 md:px-16 md:py-20">
            <Reveal>
              <p className="eyebrow text-gold">Daily Prayers</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Pray With Us Every Day</h2>
              <div className="mt-8 grid gap-x-6 gap-y-1 sm:mt-10 sm:grid-cols-2">
                {prayers.slice(0, 6).map((p) => (
                  <Link key={p.slug} to="/prayers/$slug" params={{ slug: p.slug }} className="group flex items-center justify-between border-b border-gold/20 py-3 font-display text-xl hover:text-gold">
                    {p.category}<ArrowRight className="h-4 w-4 text-gold/60 transition-all group-hover:translate-x-1 group-hover:text-gold" />
                  </Link>
                ))}
              </div>
              <Link to="/prayers" className={`${goldBtn} mt-10`}>All prayers</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Jesus Messages" title="Messages That Touch the Heart" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
            {messages.slice(0, 4).map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gold-gradient opacity-0 transition-opacity group-hover:opacity-100" />
                  <Heart className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <p className="mt-4 text-xs tracking-widest text-royal">{m.ref}</p>
                  <h3 className="mt-2 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center"><Link to="/messages" className="eyebrow text-royal hover:text-gold">Read all messages →</Link></div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="relative overflow-hidden bg-night py-16 text-on-dark md:py-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-glow opacity-40" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:gap-12">
          <div className="grid w-full max-w-sm grid-cols-3 gap-3 sm:max-w-md sm:gap-5 md:max-w-lg">
            {books.slice(4, 7).map((b) => <BookCover key={b.slug} book={b} size="fluid" />)}
          </div>
          <Reveal className="flex-1 text-center md:text-left">
            <p className="eyebrow text-gold">Christ Hope Media</p>
            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start"><span className="flex h-10 w-14 items-center justify-center rounded-xl bg-youtube shadow-youtube"><Youtube className="h-6 w-6 text-youtube-foreground" /></span><h2 className="text-3xl sm:text-4xl md:text-5xl">Join us on YouTube</h2></div>
            <p className="mt-4 text-on-dark/70">Prayers, Jesus messages and Scripture to encourage your heart every day.</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <a href={`${YOUTUBE_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className={youtubeBtn}><Youtube className="h-4 w-4" />Subscribe</a>
              <Link to="/videos" className={ghostBtn}>Watch videos</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
