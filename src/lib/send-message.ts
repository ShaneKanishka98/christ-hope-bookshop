import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TO = "info@christhopemedia.com";
const FROM = "CHRIST HOPE Website <noreply@christhopemedia.com>";

const schema = z.object({
  kind: z.enum(["contact", "prayer"]),
  name: z.string().trim().max(100).optional(),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).optional(),
  message: z.string().trim().min(1).max(3000),
  website: z.string().max(200).optional(), // honeypot
});

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot — pretend success

    const key = process.env["RESEND_API_KEY"];
    if (!key) throw new Error("Email is not configured (RESEND_API_KEY missing).");

    const label = data.kind === "prayer" ? "Prayer request" : "Contact message";
    const name = data.name || "Anonymous";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `${label} from ${name}`,
        html: `<p><b>${label}</b></p><p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(data.email || "—")}</p><p style="white-space:pre-wrap">${esc(data.message)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      throw new Error("Could not send your message. Please try again.");
    }
    return { ok: true };
  });
