import nodemailer from "nodemailer";
import { NOTIFICATION_CONFIG } from "@/lib/notificationConfig";

// Twilio configuration
const twilio = require("twilio");
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    // Prepare notification content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Submission Time: ${new Date().toLocaleString()}</small></p>
    `;

    const whatsappMessage = `*New Contact Form Submission*

*Name:* ${name}
*Email:* ${email}
*Company:* ${company}
*Service:* ${service}
*Message:* ${message}`;

    // Send email notification
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: NOTIFICATION_CONFIG.email.recipients.join(", "),
          subject: `🔔 New Contact Form Submission - ${company}`,
          html: emailContent,
          replyTo: email,
        });
        console.log("✅ Email notification sent successfully");
      } catch (emailError) {
        console.error("❌ Email notification error:", emailError);
      }
    } else {
      console.warn("⚠️ Gmail credentials not configured in .env.local");
    }

    // Send WhatsApp notifications via Twilio
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER
    ) {
      try {
        const whatsappPromises = NOTIFICATION_CONFIG.whatsapp.numbers.map(
          (phoneNumber) =>
            twilioClient.messages.create({
              from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
              to: `whatsapp:${phoneNumber}`,
              body: whatsappMessage,
            })
        );

        const results = await Promise.all(whatsappPromises);
        console.log(
          `✅ WhatsApp notifications sent to ${results.length} recipients`
        );
      } catch (whatsappError) {
        console.error("❌ WhatsApp notification error:", whatsappError);
      }
    } else {
      console.warn("⚠️ Twilio credentials not configured in .env.local");
      console.log(
        "📱 WhatsApp would be sent to:",
        NOTIFICATION_CONFIG.whatsapp.numbers
      );
    }

    return Response.json(
      {
        success: true,
        message: "Notifications processed successfully",
        notifications: {
          email: "sent",
          whatsapp: process.env.TWILIO_ACCOUNT_SID ? "sent" : "pending",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Notification error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to process notifications",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
