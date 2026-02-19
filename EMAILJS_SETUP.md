# EmailJS Setup Guide — Contact Form Backend
## For: suryasachin477@gmail.com

Follow these steps to make the contact form send real emails.

---

## Step 1 — Create Free EmailJS Account
1. Go to **https://www.emailjs.com**
2. Sign up with **suryasachin477@gmail.com**
3. Free plan: 200 emails/month ✅

---

## Step 2 — Add Email Service (Gmail)
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → sign in with suryasachin477@gmail.com
4. Service Name: `Surya Portfolio`
5. Copy the **Service ID** (e.g. `service_abc123`)

---

## Step 3 — Create Template 1: OWNER NOTIFY
*This email goes to Surya when someone submits a form.*

1. Dashboard → **Email Templates** → **Create New Template**
2. Name: `owner_notify`

**To:**        `suryasachin477@gmail.com`
**From Name:** `Portfolio Contact Form`
**Reply To:**  `{{reply_to}}`
**Subject:**   `New {{inquiry_type}} from {{from_name}} — {{company}}`

**Body (HTML or Plain Text):**
```
New {{inquiry_type}} received via your portfolio!

━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━
Type      : {{inquiry_type}}
Name      : {{from_name}}
Company   : {{company}}
Email     : {{from_email}}
Mobile    : {{mobile}}
Date/Time : {{date}}

━━━━━━━━━━━━━━━━━━━━━━━
INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━
Subject   : {{subject}}
Message   :
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━
INTERVIEW SCHEDULE (Hiring only)
━━━━━━━━━━━━━━━━━━━━━━━
{{interview_schedule}}
━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to {{from_name}}.
```

3. Save → Copy **Template ID** (e.g. `template_xyz789`)

---

## Step 4 — Create Template 2: CLIENT AUTO-REPLY
*This email goes to the person who filled the form.*

1. **Create New Template**
2. Name: `client_reply`

**To:**        `{{reply_to}}`
**From Name:** `Surya Prakash — UI/UX Designer`
**Reply To:**  `suryasachin477@gmail.com`
**Subject:**   `Got your message, {{from_name}}! 🎨 Surya will reply soon.`

**Body:**
```
Hi {{from_name}},

Thank you for reaching out through Surya Prakash's portfolio! 🙌

I've received your {{inquiry_type}} and will personally get back to you within 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━
YOUR SUBMISSION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━
Type    : {{inquiry_type}}
Company : {{company}}
Subject : {{subject}}
{{interview_schedule}}
━━━━━━━━━━━━━━━━━━━━━━━

In the meantime, feel free to reach out directly:
📧 suryasachin477@gmail.com
📱 +91 94894 23 900

Looking forward to connecting!

Warm regards,
Surya Prakash
UI/UX Designer | 7+ Years Experience
```

3. Save → Copy Template ID

---

## Step 5 — Get Public Key
1. Dashboard → **Account** → **API Keys**
2. Copy your **Public Key**

---

## Step 6 — Update Contact.js

Open `src/components/Contact/Contact.js` and replace lines 15–20:

```js
const EJS = {
  SERVICE_ID:       'service_XXXXXXX',     // ← paste your Service ID
  OWNER_TEMPLATE:   'template_XXXXXXX',    // ← paste owner_notify Template ID
  CLIENT_TEMPLATE:  'template_XXXXXXX',    // ← paste client_reply Template ID
  PUBLIC_KEY:       'XXXXXXXXXXXXXXXXXXXX', // ← paste Public Key
};
```

---

## Step 7 — Test
1. Run `npm start`
2. Fill the contact form and submit
3. Check **suryasachin477@gmail.com** inbox (also check spam)
4. Check the client email inbox

---

## Email Flow Summary

```
User submits form
      │
      ├─► Email 1 → suryasachin477@gmail.com
      │             Subject: "New Project Inquiry from John @ Acme"
      │             Full details of submission
      │
      └─► Email 2 → client's email address
                    Subject: "Got your message, John! 🎨"
                    Confirmation with summary
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Emails not arriving | Check spam folder; verify Gmail connected |
| "EmailJS error: 400" | Check template variable names match exactly |
| "EmailJS error: 401" | Wrong Public Key |
| "EmailJS error: 404" | Wrong Service/Template ID |

Free plan limit: **200 emails/month**. Upgrade at emailjs.com if needed.
