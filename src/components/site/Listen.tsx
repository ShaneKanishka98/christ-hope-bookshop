import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type State = "idle" | "playing" | "paused";

/** Reads text aloud using the browser's built-in voices (no API key needed). */
export function ListenButton({ text, label = "Listen", className = "" }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<State>("idle");
  const [supported, setSupported] = useState(false);
  const active = useRef(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (active.current) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  const start = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
    u.voice = voices.find((v) => /natural|google|samantha|aria|jenny|female/i.test(v.name)) ?? voices[0] ?? null;
    u.rate = 0.88;
    u.pitch = 1;
    u.onend = () => { active.current = false; setState("idle"); };
    u.onerror = () => { active.current = false; setState("idle"); };
    active.current = true;
    synth.speak(u);
    setState("playing");
  };
  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "idle") start();
    else if (state === "playing") { synth.pause(); setState("paused"); }
    else { synth.resume(); setState("playing"); }
  };
  const stop = () => { window.speechSynthesis.cancel(); active.current = false; setState("idle"); };

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button onClick={toggle} aria-label={state === "playing" ? "Pause" : label} className={`${btn} bg-gold-gradient text-midnight shadow-gold hover:-translate-y-0.5`}>
        {state === "playing" ? <Pause className="h-4 w-4" /> : state === "paused" ? <Play className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {state === "playing" ? "Pause" : state === "paused" ? "Resume" : label}
      </button>
      {state !== "idle" && (
        <button onClick={stop} aria-label="Stop" className={`${btn} border border-border hover:border-gold`}><Square className="h-3.5 w-3.5" />Stop</button>
      )}
    </div>
  );
}
