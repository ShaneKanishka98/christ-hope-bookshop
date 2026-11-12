# Christ Hope

Website for CHRIST HOPE Media — daily prayers, Jesus messages, Bible verses, YouTube videos and the complete Holy Bible (King James and Catholic Douay-Rheims) as a page-turning book.

Built with TanStack Start, React, Tailwind CSS and Vite.

## Development

You need Node.js 20+ and npm.

```sh
git clone https://github.com/ShaneKanishka98/christ-hope-bookshop.git
cd christ-hope-bookshop
npm install
npm run dev      # http://localhost:8080
```

Copy `.env.example` to `.env` and add your `RESEND_API_KEY` to make the contact and prayer-request forms send email.

## Deploy to Cloudflare (Workers)

The build targets Cloudflare Workers with static assets (`vite.config.ts`).

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Import a repository** and pick this GitHub repo.
2. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
3. Under **Settings → Variables and secrets** add `RESEND_API_KEY` as a **secret**.
4. After the first deploy open **Settings → Domains & routes** and add `christhopemedia.com` (and `www`).

Every push to `main` then redeploys the site automatically.

Preview locally with `npm run build && npx vite preview`.

## Bible text

`public/bible/` holds the King James Version and `public/bible/drc/` the Douay-Rheims (Challoner) Catholic Bible. Both are in the public domain.
