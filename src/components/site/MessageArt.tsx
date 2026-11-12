import { useId, type ReactNode } from "react";

/** Eight different illustrated scenes, one per Jesus message. */
const rays = (cx: number, cy: number, n = 14, len = 420, op = 0.16) =>
  Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n;
    return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * len} y2={cy + Math.sin(a) * len} stroke="#f6dc9a" strokeOpacity={op} strokeWidth="14" />;
  });

const palettes: [string, string, string][] = [
  ["#f6b45c", "#d56a4b", "#2a1b4d"], // dawn
  ["#7fb6e8", "#3b5fa8", "#10204a"], // hope
  ["#f3d27a", "#e28b4e", "#3a2250"], // golden hour
  ["#8ed1c9", "#3f8fa0", "#0d2a4a"], // sea
  ["#c7b3ff", "#6a58c9", "#150f3d"], // twilight
  ["#ffd58a", "#c9704a", "#2b1740"], // strength
  ["#9fd0ff", "#4a7bd0", "#0c1c47"], // faith skies
  ["#b8c6e8", "#5a6fa8", "#101a3a"], // night rain
];

function scene(i: number, glow: string): ReactNode {
  switch (i) {
    case 0: // sunrise over hills, a bird
      return (
        <>
          <circle cx="400" cy="300" r="90" fill="#fff3c4" />
          {rays(400, 300)}
          <path d="M0 340 Q150 270 300 330 T600 320 T800 340 V450 H0Z" fill="#2a1b4d" fillOpacity=".75" />
          <path d="M0 380 Q200 330 400 380 T800 370 V450 H0Z" fill="#150c33" />
          <path d="M560 150 q12 -14 24 0 q12 -14 24 0" stroke="#fff" strokeWidth="3" fill="none" />
        </>
      );
    case 1: // cross on a hill with light
      return (
        <>
          <circle cx="400" cy="210" r="140" fill={glow} />
          {rays(400, 210, 18, 460, 0.12)}
          <path d="M0 360 Q400 250 800 360 V450 H0Z" fill="#0b1433" />
          <rect x="392" y="170" width="16" height="130" fill="#0b1433" />
          <rect x="360" y="205" width="80" height="16" fill="#0b1433" />
        </>
      );
    case 2: // clock: God's timing
      return (
        <>
          <circle cx="400" cy="225" r="120" fill="none" stroke="#fff3c4" strokeOpacity=".6" strokeWidth="4" />
          <circle cx="400" cy="225" r="100" fill="none" stroke="#fff3c4" strokeOpacity=".25" strokeWidth="2" strokeDasharray="4 10" />
          <line x1="400" y1="225" x2="400" y2="150" stroke="#fff3c4" strokeWidth="6" strokeLinecap="round" />
          <line x1="400" y1="225" x2="450" y2="250" stroke="#f6b45c" strokeWidth="5" strokeLinecap="round" />
          <circle cx="400" cy="225" r="8" fill="#fff3c4" />
          {rays(400, 225, 12, 380, 0.1)}
          <path d="M0 400 Q400 340 800 400 V450 H0Z" fill="#1d1038" />
        </>
      );
    case 3: // path with footprints: never alone
      return (
        <>
          <path d="M0 330 Q250 250 800 320 V450 H0Z" fill="#06213a" />
          <path d="M320 450 Q380 330 430 260 Q450 235 470 260 Q520 330 600 450Z" fill="#0f4a66" fillOpacity=".7" />
          {[[420, 400], [460, 370], [430, 335], [462, 308], [440, 282]].map(([x = 0, y = 0], k) => (
            <g key={k} fill="#fff3c4" fillOpacity={0.85 - k * 0.12}>
              <ellipse cx={x} cy={y} rx="9" ry="14" />
              <ellipse cx={x + 24} cy={y - 16} rx="9" ry="14" />
            </g>
          ))}
          <circle cx="400" cy="130" r="55" fill="#eaffff" fillOpacity=".9" />
          {rays(400, 130, 16, 300, 0.12)}
        </>
      );
    case 4: // star in a twilight sky
      return (
        <>
          {Array.from({ length: 40 }, (_, k) => (
            <circle key={k} cx={(k * 197) % 800} cy={(k * 83) % 260} r={(k % 3) + 1} fill="#fff" fillOpacity={0.4 + (k % 5) * 0.12} />
          ))}
          <circle cx="400" cy="140" r="110" fill={glow} />
          <path d="M400 80 l14 40 42 2 -33 26 12 40 -35 -23 -35 23 12 -40 -33 -26 42 -2z" fill="#ffe9a8" />
          <path d="M0 370 Q200 310 420 360 T800 340 V450 H0Z" fill="#0d0830" />
        </>
      );
    case 5: // mountain peak: strength
      return (
        <>
          <circle cx="560" cy="150" r="70" fill="#fff3c4" fillOpacity=".95" />
          {rays(560, 150, 14, 380, 0.1)}
          <path d="M0 450 L220 190 L330 300 L470 120 L640 320 L720 250 L800 360 V450Z" fill="#241038" />
          <path d="M470 120 L420 190 L460 180 L480 210 L510 175Z" fill="#fff" fillOpacity=".85" />
          <path d="M0 450 L160 330 L300 400 L460 310 L620 410 L800 330 V450Z" fill="#150a2a" />
        </>
      );
    case 6: // open sky, clouds and a dove
      return (
        <>
          {rays(400, 60, 20, 480, 0.1)}
          <g fill="#fff" fillOpacity=".75">
            <ellipse cx="180" cy="320" rx="130" ry="34" />
            <ellipse cx="260" cy="300" rx="90" ry="32" />
            <ellipse cx="620" cy="350" rx="150" ry="36" />
            <ellipse cx="540" cy="330" rx="90" ry="30" />
          </g>
          <circle cx="400" cy="195" r="100" fill={glow} />
          <path d="M330 190 Q370 150 400 190 Q430 150 470 190 Q430 175 400 215 Q370 175 330 190Z" fill="#fff" />
        </>
      );
    default: // night rain and a glowing tear
      return (
        <>
          {Array.from({ length: 28 }, (_, k) => (
            <line key={k} x1={(k * 61) % 800} y1={(k * 47) % 200} x2={((k * 61) % 800) - 10} y2={((k * 47) % 200) + 34} stroke="#cfe0ff" strokeOpacity=".35" strokeWidth="2" />
          ))}
          <circle cx="400" cy="215" r="130" fill={glow} />
          <path d="M400 130 Q340 220 400 270 Q460 220 400 130Z" fill="#eaf3ff" fillOpacity=".92" />
          <path d="M0 390 Q400 340 800 390 V450 H0Z" fill="#0a1230" />
        </>
      );
  }
}

export function MessageArt({ index, className = "" }: { index: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const i = index % 8;
  const [c1, c2, c3] = palettes[i]!;
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c3} />
          <stop offset=".6" stopColor={c2} />
          <stop offset="1" stopColor={c1} />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#fff6d2" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff6d2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}s)`} />
      {scene(i, `url(#${id}g)`)}
    </svg>
  );
}
