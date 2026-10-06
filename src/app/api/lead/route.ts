import twilio from "twilio";
import { resolveTwilioCredentials } from "@/lib/twilio-auth";

function isLikelyUkPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+?44|0)\d{9,10}$/.test(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      fullName,
      email,
      phoneNumber,
      postcode,
      propertyType,
      timeframe,
    } = body ?? {};

    if (!fullName || !email || !phoneNumber) {
      return new Response("Missing fields", { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response("Invalid email", { status: 422 });
    }

    if (!isLikelyUkPhone(phoneNumber)) {
      return new Response("Invalid phone", { status: 422 });
    }

    const [firstName, ...rest] = String(fullName).trim().split(/\s+/);
    const lastName = rest.join(" ") || "-";

    const config = resolveTwilioCredentials();

    if (!config.ok) {
      const detail =
        process.env.NODE_ENV === "development"
          ? `Missing: ${config.missing.join(", ")}`
          : "Server not configured";
      console.error("Twilio config error:", detail);
      return new Response(detail, { status: 500 });
    }

    const messageBody = [
      "New Roofing Lead (website)",
      `Name: ${firstName} ${lastName}`,
      `Phone: ${phoneNumber}`,
      `Email: ${email}`,
      postcode ? `Postcode: ${postcode}` : null,
      propertyType ? `Property: ${propertyType}` : null,
      timeframe ? `Timeframe: ${timeframe}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const client = twilio(config.accountSid, config.authToken);

    const message = await client.messages.create({
      body: messageBody,
      from: config.fromNumber,
      to: config.toNumber,
    });

    console.log("Twilio message sent:", message.sid);

    return new Response(JSON.stringify({ ok: true, sid: message.sid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Twilio send error:", err);
    const detail =
      err instanceof Error ? err.message : "Unexpected error";
    return new Response(
      process.env.NODE_ENV === "development" ? detail : "Failed to send SMS",
      { status: 502 },
    );
  }
}
