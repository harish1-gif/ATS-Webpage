# Twilio WhatsApp Integration Setup

Your system now has the code ready to send WhatsApp messages via Twilio. Follow these steps to activate it.

## Step 1: Create a Twilio Account

1. Go to [Twilio.com](https://www.twilio.com)
2. Click **Sign Up** and create a free account
3. Verify your email and phone number
4. Complete the setup wizard

## Step 2: Enable WhatsApp Messaging

1. In your Twilio Dashboard, go to **Messaging > Channels > WhatsApp**
2. Click **Connect WhatsApp Business Account** or **Get Started**
3. Follow Twilio's onboarding process:
   - Connect your WhatsApp Business Account (or create one)
   - Get your WhatsApp Sandbox number (for testing)

## Step 3: Get Your Credentials

In the Twilio Dashboard, find:

1. **Account SID** - Located at the top of your dashboard (starts with `AC...`)
2. **Auth Token** - Located next to Account SID (click to reveal)
3. **Twilio WhatsApp Number** - Found in Messaging > WhatsApp:
   - Format: `+1234567890` (your sandbox number or production number)

## Step 4: Add Credentials to `.env.local`

Add these lines to your `.env.local` file:

```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890
```

**Example:**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_32_character_auth_token
TWILIO_WHATSAPP_NUMBER=+14155552671
```

## Step 5: Add Recipients to WhatsApp Sandbox (Testing)

For testing, you need to add your phone numbers to the Twilio WhatsApp Sandbox:

1. In Twilio Dashboard → Messaging → WhatsApp → Sandbox
2. Scroll to "Sandbox Participants"
3. Send this message from WhatsApp to the sandbox number:
   ```
   join [sandbox-join-code]
   ```
4. Wait for confirmation

Then update the Indian numbers in `/src/lib/notificationConfig.ts`:

```typescript
export const NOTIFICATION_CONFIG = {
  whatsapp: {
    numbers: ["+919384149660", "+918668052762"],
  },
  email: {
    recipient: "harishkollu7@gmail.com",
  },
};
```

## Step 6: Test the System

1. Fill out the contact form on your website
2. Submit it
3. Check:
   - ✅ Email at `harishkollu7@gmail.com`
   - ✅ WhatsApp at `+91 9384149660` and `+91 8668052762`

## Important Notes

### Free Trial Limitations
- Twilio free tier has $15 credit
- WhatsApp messages cost ~$0.0075 per message
- Only pre-approved numbers can receive messages in sandbox mode

### Production Setup
To send WhatsApp to any number (not just sandbox):
1. Request production WhatsApp access from Twilio
2. Upgrade your Twilio account (pay as you go)
3. Use your production WhatsApp number instead of sandbox

### Pricing
- WhatsApp messages: ~$0.007-0.008 per message (varies by country)
- Twilio free trial: $15 credit
- Estimate: ~2000 messages for free trial

## Troubleshooting

**Messages not sending?**
- Verify Account SID and Auth Token are correct
- Check WhatsApp number format (with +)
- Ensure numbers are added to sandbox participants (if testing)
- Check Twilio dashboard for error logs

**"Invalid phone number" error?**
- Verify number format: `+919384149660` (with country code)
- Ensure it's a valid WhatsApp number

**Free credit exhausted?**
- Add a payment method to continue
- Or request a production WhatsApp Business Account for better rates

## Next Steps

1. Sign up for Twilio: https://www.twilio.com/referral/WXnOCJ
2. Get credentials
3. Add to `.env.local`
4. Test by submitting contact form
5. Both Gmail AND WhatsApp will receive notifications!

