"use server";

import { Resend } from "resend";
import { z } from "zod";
import type { ContactFormState } from "@/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function sendEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Fail loudly di runtime kalau env tidak ter-set — bukan di import time
  // (alasannya: build step `next build` tidak boleh gagal hanya karena env belum di-set lokal)
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      status: "error",
      message: "Email service is not configured. Contact admin.",
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return {
      status: "error",
      message: "Failed to send message. Please try again later.",
    };
  }

  return {
    status: "success",
    message: "Message received! I'll be in touch soon.",
  };
}
