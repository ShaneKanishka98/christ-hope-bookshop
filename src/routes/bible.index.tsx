import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BibleReader } from "@/components/site/BibleReader";

export const Route = createFileRoute("/bible/")({
  head: () => ({
    meta: [
      { title: "Read the Holy Bible (KJV) — CHRIST HOPE" },
      { name: "description", content: "Read the complete Holy Bible online — all 66 books of the King James Version, in a book you can turn page by page." },
      { property: "og:title", content: "Read the Holy Bible — CHRIST HOPE" },
      { property: "og:description", content: "The complete Holy Bible, free to read." },
    ],
  }),
  component: BibleIndex,
});

function BibleIndex() {
  const [loc, setLoc] = useState({ slug: "genesis", chapter: 1 });
  return <BibleReader bookSlug={loc.slug} chapter={loc.chapter} onLocationChange={(slug, chapter) => setLoc({ slug, chapter })} />;
}
