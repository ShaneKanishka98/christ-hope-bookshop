import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { bibleBooks, drcBooks } from "@/lib/bible-books";
import { BibleReader } from "@/components/site/BibleReader";

export const Route = createFileRoute("/bible/$book/$chapter")({
  loader: ({ params }) => {
    const book = bibleBooks.find((b) => b.slug === params.book) ?? drcBooks.find((b) => b.slug === params.book);
    const chapter = Number(params.chapter);
    if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) throw notFound();
    return { book, chapter };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.book.name} ${loaderData.chapter} — Holy Bible (KJV) — CHRIST HOPE` },
          { name: "description", content: `Read ${loaderData.book.name} chapter ${loaderData.chapter} in the King James Version of the Holy Bible.` },
        ]
      : [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Reader,
});

function Reader() {
  const { book, chapter } = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <BibleReader
      bookSlug={book.slug}
      chapter={chapter}
      onLocationChange={(slug, c) => void navigate({ to: "/bible/$book/$chapter", params: { book: slug, chapter: String(c) }, replace: true, resetScroll: false })}
    />
  );
}
