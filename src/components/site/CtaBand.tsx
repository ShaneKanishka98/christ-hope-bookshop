import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Youtube } from "lucide-react";
import { YOUTUBE_URL } from "@/lib/content";
import { Reveal, goldBtn, ghostBtn, youtubeBtn } from "./ui";

/** Big call-to-action block shown above the footer on every page. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-midnight py-14 text-on-dark md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow opacity-25" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Faith • Hope • Love</p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl">Let God's Word Walk With You</h2>
          <p className="mt-4 text-on-dark/70">Read the Bible, watch daily encouragement and pray with us — wherever you are.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          <Reveal>
            <div className="group flex h-full flex-col items-center rounded-2xl border border-gold/40 bg-navy/70 p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-gold sm:p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold"><BookOpen className="h-6 w-6" strokeWidth={1.4} /></span>
              <h3 className="mt-5 text-2xl sm:text-3xl">Read the Holy Bible</h3>
              <p className="mt-2 text-sm text-on-dark/65">The complete Bible in a page-turning book — King James and Catholic Douay-Rheims.</p>
              <Link to="/bible" className={`${goldBtn} mt-6 w-full sm:w-auto`}>Open the Bible <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="group flex h-full flex-col items-center rounded-2xl border border-youtube/50 bg-navy/70 p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-youtube hover:shadow-youtube sm:p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-youtube text-youtube-foreground"><Youtube className="h-6 w-6" strokeWidth={1.6} /></span>
              <h3 className="mt-5 text-2xl sm:text-3xl">Join Us on YouTube</h3>
              <p className="mt-2 text-sm text-on-dark/65">New prayers, Jesus messages and daily encouragements — subscribe so you never miss one.</p>
              <a href={`${YOUTUBE_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className={`${youtubeBtn} mt-6 w-full sm:w-auto`}><Youtube className="h-4 w-4" />Subscribe now</a>
            </div>
          </Reveal>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/about" className={ghostBtn}>Explore Christ Hope</Link>
          <Link to="/prayer-request" className={ghostBtn}>Share a prayer request</Link>
        </div>
      </div>
    </section>
  );
}
