// Writes public/sitemap.xml before every build. Prayer pages are read from src/lib/content.ts.
import fs from "node:fs";

const SITE = "https://christhopemedia.com";
const content = fs.readFileSync("src/lib/content.ts", "utf8");
const prayersPart = content.slice(content.indexOf("export const prayers"));
const prayerSlugs = [...prayersPart.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);
const pages = [
  ["/", "1.0", "weekly"],
  ["/bible", "0.9", "monthly"],
  ["/prayers", "0.9", "weekly"],
  ["/messages", "0.8", "weekly"],
  ["/verses", "0.8", "weekly"],
  ["/videos", "0.8", "weekly"],
  ["/prayer-request", "0.6", "yearly"],
  ["/about", "0.6", "yearly"],
  ["/contact", "0.5", "yearly"],
  ...prayerSlugs.map((s) => [`/prayers/${s}`, "0.7", "monthly"]),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map(([p, pr, cf]) => `  <url><loc>${SITE}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml written with ${pages.length} URLs`);
