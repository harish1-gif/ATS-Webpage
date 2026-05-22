# Contact Form Notification Setup

Your contact form is now configured to send notifications via **Gmail** when someone submits the form.

## Setup Instructions

### 1. Gmail App Password Configuration

To enable email notifications, you need to set up a Gmail App Password:

#### Steps:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** and **Windows Computer** (or your OS)
5. Google will generate a 16-character password
6. Copy this password and add it to `.env.local`:

```
GMAIL_USER=harishkollu7@gmail.com
GMAIL_APP_PASSWORD=your-16-character-password-here
```

### 2. Notification Recipients

**Email Notification:**
- To: `harishkollu7@gmail.com`

**WhatsApp Notification (Manual):**
- `+91 9384149660`
- `+91 8668052762`

Currently, WhatsApp notifications are logged to the server console. To automate WhatsApp notifications, you can integrate with **Twilio** (paid service).

## How It Works

When someone fills out the contact form and clicks "Send Spec Proposal":

1. ✅ **Email is sent** to `harishkollu7@gmail.com` with all form details
2. 📱 **WhatsApp notification** is logged (manual sending or Twilio integration needed)
3. ✅ **Success message** is displayed to the user

## Testing

1. Fill out the contact form
2. Submit it
3. Check `harishkollu7@gmail.com` inbox for the notification email
4. View server logs for WhatsApp notification details

## Troubleshooting

**Email not sending?**
- Verify Gmail credentials in `.env.local`
- Check that App Password is correct (16 characters)
- Make sure 2-Step Verification is enabled on the Gmail account

**Need Twilio for WhatsApp?**
- Sign up at [Twilio](https://www.twilio.com)
- Install: `npm install twilio`
- Update `/api/notify` route to include Twilio WhatsApp API calls

