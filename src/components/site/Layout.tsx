import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X, Youtube, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart, money } from "@/lib/cart";
import { getBook, YOUTUBE_URL } from "@/lib/content";
import { BookCover } from "./BookCover";
import { goldBtn } from "./ui";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/prayers", label: "Daily Prayers" },
  { to: "/messages", label: "Jesus Messages" },
  { to: "/verses", label: "Bible Verses" },
  { to: "/bookstore", label: "Bookstore" },
  { to: "/videos", label: "Videos" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 font-display text-lg text-gold">✝</span>
      <span className="leading-none">
        <span className="block font-display text-xl tracking-[0.18em] text-on-dark">CHRIST HOPE</span>
        <span className="block text-[0.55rem] tracking-[0.35em] text-gold">FAITH • HOPE • LOVE</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [path]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menu ? "glass-nav py-3" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-[0.78rem] tracking-wide text-on-dark/80 transition-colors hover:text-gold" activeProps={{ className: "!text-gold" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 text-on-dark">
          <Link to="/bookstore" aria-label="Search books" className="rounded-full p-2 hover:text-gold"><Search className="h-5 w-5" /></Link>
          <button onClick={() => toast("Customer accounts are coming soon.")} aria-label="Account" className="rounded-full p-2 hover:text-gold"><User className="h-5 w-5" /></button>
          <button onClick={() => setOpen(true)} aria-label="Cart" className="relative rounded-full p-2 hover:text-gold">
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-midnight">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className={`${goldBtn} ml-3 hidden !px-5 !py-2.5 md:inline-flex`}>Subscribe</a>
          <button onClick={() => setMenu(!menu)} aria-label="Menu" className="ml-1 rounded-full p-2 xl:hidden">{menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden xl:hidden">
            <div className="flex flex-col gap-1 px-6 pb-8 pt-4">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <Link to={n.to} className="block border-b border-gold/10 py-3 font-display text-2xl text-on-dark">{n.label}</Link>
                </motion.div>
              ))}
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className={`${goldBtn} mt-6`}>Subscribe on YouTube</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, remove, subtotal } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-midnight/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-background" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 260 }}>
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="text-2xl">Your Bag</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {lines.length === 0 && <p className="text-muted-foreground">Your bag is empty.</p>}
              {lines.map((l) => {
                const b = getBook(l.slug);
                if (!b) return null;
                return (
                  <div key={l.slug + l.format} className="flex gap-4">
                    <BookCover book={b} size="sm" />
                    <div className="flex-1">
                      <p className="font-display text-lg leading-tight">{b.title}</p>
                      <p className="text-xs text-muted-foreground">Direct download · {l.format}</p>
                      <p className="mt-2 font-semibold">{money(b.price)}</p>
                    </div>
                    <button onClick={() => remove(l.slug, l.format)} aria-label="Remove" className="self-start text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                );
              })}
            </div>
            <div className="border-t px-6 py-6">
              <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-display text-2xl">{money(subtotal)}</span></div>
              <Link to="/cart" onClick={() => setOpen(false)} className={`${goldBtn} mt-5 w-full`}>View bag & checkout</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-night text-on-dark">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-sm text-on-dark/65">Sharing the love and message of Jesus Christ through prayers, Scripture, inspirational messages and Christian books.</p>
          <form
            className="mt-8 flex max-w-sm gap-2"
            onSubmit={(e) => { e.preventDefault(); toast("Newsletter sign-up will be activated soon. Thank you!"); setEmail(""); }}
          >
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Your email" className="flex-1 rounded-full border border-gold/30 bg-transparent px-5 py-3 text-sm placeholder:text-on-dark/40 focus:border-gold focus:outline-none" />
            <button className={`${goldBtn} !px-5`}>Join</button>
          </form>
        </div>
        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-5 space-y-2 text-sm text-on-dark/70">
            {nav.slice(1).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">Ministry</p>
          <ul className="mt-5 space-y-2 text-sm text-on-dark/70">
            <li><Link to="/prayer-request" className="hover:text-gold">Prayer Request</Link></li>
            <li><Link to="/policies" className="hover:text-gold">Policies & Digital Downloads</Link></li>
            <li><a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold"><Youtube className="h-4 w-4" />YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/15 py-6 text-center text-xs text-on-dark/50">© {new Date().getFullYear()} CHRIST HOPE · Faith • Hope • Love</div>
    </footer>
  );
}
