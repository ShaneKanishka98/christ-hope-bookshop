import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getBook } from "./content";

export type CartLine = { slug: string; format: "EPUB" | "PDF"; qty: number };
type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, format: "EPUB" | "PDF") => void;
  remove: (slug: string, format: string) => void;
  setQty: (slug: string, format: string, qty: number) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "christhope-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add: Ctx["add"] = (slug, format) => {
    setLines((ls) => {
      const f = ls.find((l) => l.slug === slug && l.format === format);
      if (f) return ls; // digital: one copy per format
      return [...ls, { slug, format, qty: 1 }];
    });
    setOpen(true);
  };
  const remove: Ctx["remove"] = (slug, format) => setLines((ls) => ls.filter((l) => !(l.slug === slug && l.format === format)));
  const setQty: Ctx["setQty"] = (slug, format, qty) =>
    setLines((ls) => ls.map((l) => (l.slug === slug && l.format === format ? { ...l, qty: Math.max(1, qty) } : l)));

  const subtotal = lines.reduce((s, l) => s + (getBook(l.slug)?.price ?? 0) * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return <CartCtx.Provider value={{ lines, count, subtotal, add, remove, setQty, open, setOpen }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}

export const money = (n: number) => `$${n.toFixed(2)}`;
