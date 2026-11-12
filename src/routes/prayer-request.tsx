import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import prayerImg from "@/assets/prayer-light.jpg";
import { toast } from "sonner";
import { PageHero, goldBtn } from "@/components/site/ui";
import { sendMessage } from "@/lib/send-message";

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
  const [busy, setBusy] = useState(false);
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
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                setBusy(true);
                try {
                  await sendMessage({ data: { kind: "prayer", name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), message: String(f.get("message") ?? ""), website: String(f.get("website") ?? "") } });
                  setSent(true);
                } catch {
                  toast.error("Sorry, we couldn't send your request. Please email info@christhopemedia.com.");
                } finally {
                  setBusy(false);
                }
              }}
            >
              <input name="name" maxLength={100} placeholder="Name (optional)" className={field} />
              <input name="email" type="email" maxLength={255} placeholder="Email (optional)" className={field} />
              <textarea name="message" required maxLength={3000} rows={7} placeholder="Your prayer request" className={field} />
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button className={`${goldBtn} w-full`} disabled={busy}>{busy ? "Sending…" : "Send prayer request"}</button>
              <p className="flex items-start gap-2 text-xs text-muted-foreground"><Lock className="mt-0.5 h-3 w-3 shrink-0" />Your request is private and will never be published.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
