import { SHOP_ENABLED } from "@/lib/content";
import { redirect, createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Lock } from "lucide-react";
import { useCart, money } from "@/lib/cart";
import { getBook } from "@/lib/content";
import { BookCover } from "@/components/site/BookCover";
import { goldBtn, navyBtn } from "@/components/site/ui";

export const Route = createFileRoute("/cart")({
  beforeLoad: () => { if (!SHOP_ENABLED) throw redirect({ to: "/" }); },
  head: () => ({
    meta: [
      { title: "Your Bag — Christ Hope Bookstore" },
      { name: "description", content: "Review your Christ Hope digital books before checkout." },
      { property: "og:title", content: "Your Bag — Christ Hope" },
      { property: "og:description", content: "Review your digital books before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, remove, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <section className="min-h-screen bg-background pb-24 pt-36">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-4xl sm:text-5xl">Your Bag</h1>
        {lines.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link to="/bookstore" className={`${navyBtn} mt-6`}>Visit the bookstore</Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="space-y-8 md:col-span-2">
              {lines.map((l) => {
                const b = getBook(l.slug);
                if (!b) return null;
                return (
                  <div key={l.slug + l.format} className="flex gap-6 border-b pb-8">
                    <BookCover book={b} size="sm" />
                    <div className="flex-1">
                      <Link to="/bookstore/$slug" params={{ slug: b.slug }} className="font-display text-2xl hover:text-royal">{b.title}</Link>
                      <p className="mt-1 text-sm text-muted-foreground">Christ Hope Direct · {l.format} download</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl">{money(b.price)}</p>
                      <button onClick={() => remove(l.slug, l.format)} className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" />Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <aside className="h-fit rounded-lg border bg-card p-8">
              <h2 className="text-2xl">Summary</h2>
              <form className="mt-6 flex gap-2" onSubmit={(e) => { e.preventDefault(); setMsg(code ? "This code isn't valid." : ""); }}>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" className="flex-1 rounded-full border px-4 py-2 text-sm" />
                <button className="rounded-full border px-4 text-sm hover:border-gold">Apply</button>
              </form>
              {msg && <p className="mt-2 text-xs text-destructive">{msg}</p>}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>Calculated at checkout</span></div>
              </div>
              <div className="mt-4 flex justify-between border-t pt-4 text-lg"><span>Total</span><span className="font-display text-3xl">{money(subtotal)}</span></div>
              <button disabled className={`${goldBtn} mt-6 w-full cursor-not-allowed opacity-60`}><Lock className="h-4 w-4" />Checkout</button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Secure checkout opens once payments are set up and these titles are published.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
