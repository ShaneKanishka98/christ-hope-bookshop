import { YOUTUBE_URL } from "@/lib/content";

/** The one public address of the site. Everything else (www, http) redirects here. */
export const SITE_URL = "https://christhopemedia.com";
export const SITE_NAME = "CHRIST HOPE Media";
export const SITE_DESCRIPTION =
  "Daily Christian prayers, Jesus messages, Bible verses, YouTube videos and the complete Holy Bible (King James and Catholic Douay-Rheims) to read online for free.";
export const OG_IMAGE = `${SITE_URL}/logo.jpg`;

/** Absolute, canonical URL for a path (no trailing slash except the home page, no query string). */
export const canonicalUrl = (pathname: string) => {
  const p = pathname.replace(/\/+$/, "");
  return `${SITE_URL}${p}`;
};

/** Site-wide structured data: who we are, and the website itself. Helps Google and AI answer engines. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["CHRIST HOPE", "Christ Hope Media"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: OG_IMAGE },
      description: SITE_DESCRIPTION,
      email: "info@christhopemedia.com",
      slogan: "Faith • Hope • Love",
      sameAs: [YOUTUBE_URL],
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: "info@christhopemedia.com", availableLanguage: ["English"] }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const jsonLdScript = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });
