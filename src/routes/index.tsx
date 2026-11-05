import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Youtube } from "lucide-react";
import hero from "@/assets/hero-sunrise-cross.jpg";
import prayerImg from "@/assets/prayer-light.jpg";
import { books, prayers, messages, verseOfTheDay, YOUTUBE_URL } from "@/lib/content";
import { BookCard, Reveal, SectionTitle, goldBtn, ghostBtn, navyBtn } from "@/components/site/ui";
import { BookCover } from "@/components/site/BookCover";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHRIST HOPE — Faith • Hope • Love | Prayers, Scripture & Christian Books" },
      { name: "description", content: "Discover daily prayers, inspiring Jesus messages, Scripture and beautiful Christian prayer books from CHRIST HOPE." },
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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-on-dark">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={hero} alt="Wooden cross on a mountain at sunrise" width={1920} height={1088} className="h-full w-full object-cover animate-slow-zoom" />
        </motion.div>
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
          <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.32em" }} transition={{ duration: 1.6 }} className="eyebrow text-gold-light">
            Faith • Hope • Love
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="mt-6 text-6xl tracking-[0.12em] md:text-8xl">
            CHRIST <span className="text-gold-gradient">HOPE</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.9 }} className="mx-auto mt-8 max-w-2xl font-display text-2xl italic md:text-3xl">
            “Where Faith Finds Strength, Hope Comes Alive, and Love Leads the Way.”
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mx-auto mt-6 max-w-xl text-on-dark/80">
            Discover daily prayers, inspiring messages, Scripture and beautiful Christian books created to bring faith, peace and hope into your life.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.6 }} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/about" className={goldBtn}>Explore Christ Hope</Link>
            <Link to="/bookstore" className={ghostBtn}>Discover our Bookstore</Link>
          </motion.div>
        </div>
      </section>

      {/* Verse of the day */}
      <section className="bg-night py-20 text-on-dark">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-gold">Verse of the Day</p>
          <blockquote className="mt-6 font-display text-3xl leading-snug md:text-4xl">“{verse.text}”</blockquote>
          <p className="mt-5 text-sm tracking-widest text-gold-light">{verse.ref} · NIV</p>
        </Reveal>
      </section>

      {/* Bookstore */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Christ Hope Bookstore" title="Words of Faith. Books of Hope." text="Beautiful prayer books and Christian devotionals designed to inspire your heart and bring you closer to God." />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b, i) => <Reveal key={b.slug} delay={i * 0.1}><BookCard book={b} /></Reveal>)}
          </div>
          <div className="mt-14 text-center"><Link to="/bookstore" className={navyBtn}>Browse all books <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      {/* Prayers */}
      <section className="relative overflow-hidden bg-midnight text-on-dark">
        <div className="grid lg:grid-cols-2">
          <img src={prayerImg} alt="Open Bible by candlelight at sunset" loading="lazy" width={1600} height={1008} className="h-80 w-full object-cover lg:h-full" />
          <div className="px-6 py-20 md:px-16">
            <Reveal>
              <p className="eyebrow text-gold">Daily Prayers</p>
              <h2 className="mt-4 text-5xl">Pray With Us Every Day</h2>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {prayers.slice(0, 6).map((p) => (
                  <Link key={p.slug} to="/prayers/$slug" params={{ slug: p.slug }} className="group flex items-center justify-between border-b border-gold/20 py-3 font-display text-xl hover:text-gold">
                    {p.category}<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <Link to="/prayers" className={`${goldBtn} mt-10`}>All prayers</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Jesus Messages" title="Messages That Touch the Heart" />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {messages.slice(0, 4).map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-border bg-card p-8">
                  <p className="text-xs tracking-widest text-royal">{m.ref}</p>
                  <h3 className="mt-3 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center"><Link to="/messages" className="eyebrow text-royal hover:text-gold">Read all messages →</Link></div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="relative overflow-hidden bg-night py-24 text-on-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row">
          <div className="flex -space-x-10">
            {books.slice(4, 7).map((b) => <BookCover key={b.slug} book={b} size="sm" />)}
          </div>
          <Reveal className="flex-1 text-center md:text-left">
            <p className="eyebrow text-gold">Christ Hope Media</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Join us on YouTube</h2>
            <p className="mt-4 text-on-dark/70">Prayers, Jesus messages and Scripture to encourage your heart every day.</p>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className={`${goldBtn} mt-8`}><Youtube className="h-4 w-4" />Subscribe</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
