import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import prayerImg from "@/assets/prayer-light.jpg";
import { PageHero, goldBtn } from "@/components/site/ui";

export const Route = createFileRoute("/prayer-request")({
  head: () => ({
    meta: [
      { title: "Prayer Request — CHRIST HOPE" },
      { name: "description", content: "Share a private prayer request with CHRIST HOPE. Let us pray with you." },
      { property: "og:title", content: "Let Us Pray With You — CHRIST HOPE" },
      { property: "og:description", content: "Submit a private prayer request." },
    ],
  }),
  component: PrayerRequest,
});

const field = "w-full rounded-md border border-border bg-card px-4 py-3 focus:border-gold focus:outline-none";

function PrayerRequest() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Prayer Request" title="Let Us Pray With You." image={prayerImg} />
      <section className="py-20">
        <div className="mx-auto max-w-xl px-6">
          {sent ? (
            <div className="text-center">
              <h2 className="text-4xl">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">“The Lord is close to the brokenhearted.” — Psalm 34:18</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input maxLength={100} placeholder="Name (optional)" className={field} />
              <input type="email" maxLength={255} placeholder="Email (optional)" className={field} />
              <textarea required maxLength={3000} rows={7} placeholder="Your prayer request" className={field} />
              <button className={`${goldBtn} w-full`}>Send prayer request</button>
              <p className="flex items-start gap-2 text-xs text-muted-foreground"><Lock className="mt-0.5 h-3 w-3 shrink-0" />Your request is private and will never be published. Secure storage of requests will be enabled when the site's backend is connected.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
