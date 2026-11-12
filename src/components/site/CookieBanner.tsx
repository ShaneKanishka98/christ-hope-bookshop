import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

const KEY = "ch-cookie-consent";
export const OPEN_COOKIE_SETTINGS = "open-cookie-settings";

/** Remembered choice: "all" or "essential". Nothing non-essential is loaded before the visitor chooses. */
export function getCookieConsent(): "all" | "essential" | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getCookieConsent() === null);
    const open = () => setShow(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  const choose = (v: "all" | "essential") => {
    try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ }
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
    setShow(false);
  };

  if (!show) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-2 bottom-2 z-[80] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-xs">
      <div className="rounded-xl border border-gold/40 bg-night p-3 text-on-dark shadow-2xl sm:p-4">
        <div className="flex items-start gap-2.5">
          <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
          <p className="text-xs leading-snug text-on-dark/80 sm:text-[0.8rem]">
            We use essential storage, and embedded YouTube videos may set cookies.{" "}
            <Link to="/policies" hash="cookies" className="text-gold underline underline-offset-2">Cookie policy</Link>
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => choose("all")} className="flex-1 rounded-full bg-gold-gradient px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-midnight">Accept all</button>
          <button onClick={() => choose("essential")} className="flex-1 rounded-full border border-gold/50 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-gold/10">Essential only</button>
        </div>
      </div>
    </div>
  );
}
