import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies & Digital Downloads — CHRIST HOPE" },
      { name: "description", content: "Privacy, terms, digital purchase, refund and download information for CHRIST HOPE." },
      { property: "og:title", content: "Policies — CHRIST HOPE" },
      { property: "og:description", content: "Privacy, terms and digital download information." },
    ],
  }),
  component: Policies,
});

const sections = [
  ["Digital downloads", "Direct purchases from CHRIST HOPE are digital EPUB or PDF files. After verified payment, books appear in your library with secure, time-limited download links. Amazon Kindle purchases are made on Amazon and are managed by Amazon, not by CHRIST HOPE."],
  ["Refunds", "Our full digital purchase and refund policy will be published here before the bookstore opens for sales."],
  ["Privacy", "We collect only the information needed to serve you. Prayer requests are private and never published without your explicit consent. Marketing emails are sent only with your consent, and every email includes an unsubscribe link."],
  ["Cookies", "We use only essential browser storage, for example to remember your cookie choice. Our pages embed YouTube videos through YouTube\u2019s privacy-enhanced mode (youtube-nocookie.com); YouTube may set its own cookies when you play a video. You can change your choice at any time with \u201cCookie settings\u201d in the footer, and you can clear cookies in your browser settings."],
  ["Terms", "Complete terms and conditions will be published here before the bookstore opens for sales."],
];

function Policies() {
  return (
    <>
      <PageHero eyebrow="Policies" title="Policies & Digital Downloads" />
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map(([t, d]) => (
            <div key={t} id={String(t).toLowerCase()} className="scroll-mt-28"><h2 className="text-3xl">{t}</h2><p className="mt-3 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
