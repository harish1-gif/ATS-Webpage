import nodemailer from "nodemailer";
import { NOTIFICATION_CONFIG } from "@/lib/notificationConfig";

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
    const { email, type } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Prepare notification content
    const emailContent = `
      <h2>New Service Discussion Request</h2>
      <p><strong>Subscriber Email:</strong> ${email}</p>
      <p><strong>Request Type:</strong> ${type === "newsletter_subscription" ? "Service Discussion" : type}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>A user has submitted their email to discuss services with us.</p>
    `;

    // Send email notification to admin
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: NOTIFICATION_CONFIG.email.recipients.join(", "),
          subject: `📧 New Service Discussion Request - ${email}`,
          html: emailContent,
          replyTo: email,
        });
        console.log("✅ Service discussion email sent to admin successfully");

        // Send confirmation to subscriber
        const confirmationContent = `
          <h2>Thank You for Your Interest</h2>
          <p>Hello,</p>
          <p>We received your email and appreciate your interest in our services. Our team will review your request and get back to you soon.</p>
          <p>Best regards,<br>AGZUS Technology Solutions</p>
        `;

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Service Discussion Request Received - AGZUS",
          html: confirmationContent,
        });
        console.log("✅ Confirmation email sent to subscriber successfully");
      } catch (emailError) {
        console.error("❌ Email notification error:", emailError);
        return Response.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      console.warn("⚠️ Gmail credentials not configured in .env.local");
      return Response.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Service discussion request submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Newsletter API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
