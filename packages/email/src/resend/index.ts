import { Resend } from "resend";

import type { ResendEmailOptions } from "./types";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

console.log("Resend API Key", process.env.RESEND_API_KEY);

export const sendMail = async (opts: ResendEmailOptions) => {
  if (!resend) {
    console.info(
      "RESEND_API_KEY is not set in the .env. Skipping sending email."
    );
    return;
  }

  const { email, bcc, subject, text, react, scheduledAt } = opts;

  return await resend.emails.send({
    to: email,
    from: "Xpert Zone <noreply@vishnumouli.me>",
    bcc: bcc,
    subject,
    text,
    react,
    scheduledAt,
  });
};
