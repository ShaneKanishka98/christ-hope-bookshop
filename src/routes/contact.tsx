import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Youtube } from "lucide-react";
import { YOUTUBE_URL } from "@/lib/content";
import { sendMessage } from "@/lib/send-message";
import { PageHero, goldBtn } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CHRIST HOPE" },
      { name: "description", content: "Get in touch with the CHRIST HOPE ministry and bookstore." },
      { property: "og:title", content: "Contact CHRIST HOPE" },
      { property: "og:description", content: "Send us a message — we'd love to hear from you." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-md border border-border bg-card px-4 py-3 focus:border-gold focus:outline-none";

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd Love to Hear From You" />
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-16 px-6 md:grid-cols-2">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setBusy(true);
              try {
                await sendMessage({ data: { kind: "contact", name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), message: String(f.get("message") ?? ""), website: String(f.get("website") ?? "") } });
                setSent(true);
                toast.success("Thank you — your message has been sent.");
              } catch {
                toast.error("Sorry, we couldn't send your message. Please email info@christhopemedia.com.");
              } finally {
                setBusy(false);
              }
            }}
          >
            <input name="name" required maxLength={100} placeholder="Your name" className={field} />
            <input name="email" required type="email" maxLength={255} placeholder="Email address" className={field} />
            <textarea name="message" required maxLength={2000} rows={6} placeholder="Your message" className={field} />
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button className={goldBtn} disabled={sent || busy}>{sent ? "Sent" : busy ? "Sending…" : "Send message"}</button>
          </form>
          <div className="space-y-6">
            <h2 className="text-3xl">Stay connected</h2>
            <p className="text-muted-foreground">Follow our daily prayers and messages on YouTube.</p>
            <p><a href="mailto:info@christhopemedia.com" className="text-royal hover:text-gold">info@christhopemedia.com</a></p>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-royal hover:text-gold"><Youtube className="h-5 w-5" />@ChristHopeMediaOfficial</a>
            <div className="rounded-lg bg-secondary p-6">
              <h3 className="text-2xl">Need prayer?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Share a private prayer request with us.</p>
              <Link to="/prayer-request" className="eyebrow mt-4 inline-block text-royal">Let us pray with you →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
