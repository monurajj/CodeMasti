# CodeMasti – Project Summary

A detailed overview of the CodeMasti web application: purpose, tech stack, features, architecture, and setup.

---

## 1. Project Overview

**CodeMasti** is a marketing and registration website for a **coding education platform** aimed at school students in **Class 5 to Class 10** in India. The product is positioned as cost-efficient and future-ready, with the tagline **“Think. Solve. Create.”**

- **Founded by:** Aditya Raj & Monu Raj  
- **Primary domain:** `codemasti.com` (configurable via `NEXT_PUBLIC_SITE_URL`)  
- **Contact:** info.codemasti@gmail.com  

The app supports:

- **Pre-launch:** Countdown to platform launch (e.g. 5 Feb 2026), newsletter signup, and early-bird scholarship messaging.  
- **Post-launch:** Course registration with batch selection, optional **PhonePe** payment or “Pay Later,” confirmation emails, and admin notifications.  
- **Ongoing:** Contact form, programs info, about/founder story, legal pages (Terms, Privacy, Refund).

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI** | React 18 |
| **Email** | Nodemailer (SMTP) – configurable (e.g. Gmail) |
| **Data storage** | Google Sheets API (googleapis) – registrations, contact, newsletter |
| **Payments** | PhonePe Standard Checkout v2 (sandbox + production) |
| **SEO** | Metadata, Open Graph, Twitter cards, JSON-LD (Organization, WebSite, LocalBusiness), sitemap, robots |

---

## 3. Features & User Flows

### 3.1 Home Page (`/`)

- **Hero:** Rotating slides (e.g. 75% early-bird scholarship), countdown to launch.  
- **Launch sequence:** When countdown hits zero, a short “3… 2… 1…” then “party” animation runs, then registration CTA is shown.  
- **Newsletter:** Email capture; stored in Google Sheets and welcome email sent (Resend/SMTP).  
- **Taglines:** Rotating taglines (e.g. “Don’t just play the game. Build it.”, “Code. Create. Masti.”).  
- **Sections:** Value proposition, programs teaser, CTA to Programs and Register.  
- **Parallax / scroll:** Mouse-based parallax and scroll-triggered animations via Intersection Observer.  
- **Mobile:** Responsive layout and mobile menu.

### 3.2 Programs Page (`/programs`)

- **Three batches:**  
  - **SPARK** (Class 5–6) – logical thinking, visual programming, flowcharts.  
  - **BUILDERS** (Class 7–8) – Python fundamentals, conditions/loops/functions, mini projects.  
  - **INNOVATORS** (Class 9–10) – advanced Python, project-based learning, AI concepts, career awareness.  
- **Scholarship tiers:** Time-based discount (e.g. 75% Feb, 50% Mar, 25% Apr) with displayed discounted price.  
- **URL:** `?batch=spark|builders|innovators` preselects the tab.  
- **CTA:** Links to Register with batch context.

### 3.3 Register Page (`/register`)

- **Form fields:** Name, email, phone, student class, batch (SPARK / BUILDERS / INNOVATORS).  
- **Validation:** Real-time and on submit (email format, Indian 10-digit phone, required fields).  
- **Payment options:**  
  - **Pay now:** Calls PhonePe create-payment API, redirects to PhonePe, then to result page; `merchantOrderId` is sent with registration.  
  - **Pay later:** Submits registration without payment; status stored as “Pay Later.”  
- **Persistence:** Form draft in `localStorage` to avoid loss on refresh/back.  
- **Confirmation:** Dialog before submit; success/error messages with optional retry.  
- **Result:** Success/error page at `/register/result` (and pay-test result at `/pay-test/result`).

### 3.4 Contact Page (`/contact`)

- **Form:** Name, email, phone (optional), student class (optional), message.  
- **Submit:** Saves to Google Sheets (contact row), sends notification to admin (info.codemasti@gmail.com).  
- **Draft:** Form data saved in `localStorage`.

### 3.5 About Page (`/about`)

- **Content:** Mission, founder story (Aditya Raj & Monu Raj), why CodeMasti, brand values.  
- **Shared UI:** Same nav/footer and Particles background as rest of site.

### 3.6 Legal & Policy Pages

- **Terms** (`/terms`), **Privacy** (`/privacy`), **Refund** (`/refund`): Static content with layout and nav.

### 3.7 Pay Test (`/pay-test`, `/pay-test/result`)

- **Purpose:** Test PhonePe flow (create payment, redirect, result page with `merchantOrderId`).  
- **API:** Uses same PhonePe create-payment and status APIs.

---

## 4. Pages & Routes (App Router)

| Path | Purpose |
|------|--------|
| `/` | Home – countdown, newsletter, hero, taglines |
| `/about` | About CodeMasti & founders |
| `/programs` | Three batches, scholarship tiers, pricing |
| `/register` | Registration form + Pay Now / Pay Later |
| `/register/result` | Registration result (success/error) |
| `/contact` | Contact form |
| `/terms` | Terms of use |
| `/privacy` | Privacy policy |
| `/refund` | Refund policy |
| `/pay-test` | PhonePe test payment page |
| `/pay-test/result` | Payment test result |

Each section has a `layout.tsx` where needed for shared structure/metadata.

---

## 5. API Routes & Integrations

### 5.1 Registration – `POST /api/register`

- **Body:** `name`, `email`, `phone`, `studentClass`, `batch`, optional `paymentMerchantOrderId`, optional `paymentStatus` (e.g. `pay_later`).  
- **Validation:** Required fields, email format, valid batch.  
- **Duplicate check:** `registrationEmailExists()` – one registration per email (409 if duplicate).  
- **Actions:**  
  - Append row to Google Sheet (Timestamp, Name, Email, Phone, Student Class, Batch, Payment Ref, Payment Status, Type = Registration, etc.).  
  - Send **confirmation email** to user (batch-specific HTML: program details, next steps, schedule).  
  - Send **admin email** to info.codemasti@gmail.com with same details + payment status.  
- **Response:** `{ success, message, emailSent }` or error with status code.

### 5.2 Newsletter – `POST /api/newsletter`

- **Body:** `email`.  
- **Actions:** Append to Google Sheet (newsletter row), send welcome email to user, optionally notify admin.  
- **Response:** Success or validation/error.

### 5.3 Contact – `POST /api/contact`

- **Body:** `name`, `email`, `message`, optional `phone`, `studentClass`.  
- **Actions:** Append to Google Sheet (contact row), send notification to admin.  
- **Response:** Success or error.

### 5.4 PhonePe

- **`POST /api/phonepe/create-payment`**  
  - Body: `amountInPaisa`, `redirectPath`, `origin`.  
  - Creates order with `createPhonePePayment()` (lib/phonepe), returns `redirectUrl`, `merchantOrderId`, `orderId`, `state`.  
- **`GET /api/phonepe/status?merchantOrderId=...`**  
  - Returns order status from PhonePe.  
- **`GET /api/phonepe/config-check`**  
  - Checks env (client id/secret, sandbox/production) and optionally token; for debugging.

**PhonePe lib (`lib/phonepe.ts`):**  
- OAuth2 client credentials → cached access token.  
- Sandbox vs production URLs (env `PHONEPE_SANDBOX`).  
- `createPhonePePayment()`, order status fetch, redirect URL built from `NEXT_PUBLIC_APP_URL` or `origin`.

---

## 6. Data & Backend

### 6.1 Google Sheets

- **Single spreadsheet:** `GOOGLE_SHEET_ID`.  
- **Auth:** Service account (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GOOGLE_PROJECT_ID`).  
- **Sheet1 columns (conceptual):** Timestamp, Name, Email, Phone, Student Class, Message, Type (Contact | Newsletter | Registration), Resolved, Section, Admission Done, Message by Founder, Notes, Payment Ref, Payment Status.  
- **Functions (lib/google-sheets.ts):**  
  - `initializeSheet()` – ensure headers.  
  - `appendRegistrationToSheet()`, `appendContactToSheet()`, `appendNewsletterToSheet()`.  
  - `registrationEmailExists()` – used to block duplicate registrations.

### 6.2 Email

- **Provider:** Nodemailer with SMTP (e.g. Gmail: `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`).  
- **Usage:** Registration confirmation (batch-specific HTML), registration admin alert, newsletter welcome, contact admin notification.  
- **From:** Default `CodeMasti <SMTP_USER>`.

---

## 7. Payments (PhonePe)

- **Flow:** Register (or pay-test) → create payment → redirect to PhonePe → user pays → redirect back to `redirectPath` (e.g. `/register/result` or `/pay-test/result`) with `merchantOrderId` in query.  
- **Registration:** If user chose “Pay now,” frontend calls create-payment, redirects; after return, registration is submitted with `paymentMerchantOrderId` so backend can store “Paid” and optional ref.  
- **Env:** `PHONEPE_CLIENT_ID`, `PHONEPE_CLIENT_SECRET`, `PHONEPE_SANDBOX`, `PHONEPE_CLIENT_VERSION`, `NEXT_PUBLIC_APP_URL` (or Vercel URL) for redirect base.

---

## 8. Frontend Components & UX

### 8.1 Reusable Components

- **Particles** – Animated background dots.  
- **ImageSkeleton** – Loading placeholder for images.  
- **LoadingSpinner** – Button/loading state.  
- **ErrorMessage** – API/validation errors with optional suggestion.  
- **SuccessMessage** – Success state.  
- **ConfirmationDialog** – Confirm before submit (e.g. Pay Later).  
- **ErrorBoundary / ErrorBoundaryWrapper** – React error boundary for graceful failures.  
- **WhatsAppButton** – Floating WhatsApp link (e.g. to founder/team).

### 8.2 Client Utilities

- **lib/api-client.ts** – `postRequest()` for API calls.  
- **lib/error-messages.ts** – `getErrorMessage()`, `getApiErrorMessage()` for user-facing messages.

### 8.3 Accessibility & SEO

- **Skip link:** “Skip to main content” for keyboard/screen readers.  
- **Metadata:** Per-route titles, descriptions, keywords; Open Graph and Twitter cards; favicon/apple touch.  
- **Structured data:** JSON-LD for EducationalOrganization, WebSite, LocalBusiness (layout.tsx).  
- **Sitemap:** `app/sitemap.ts` – home, about, programs, register, contact.  
- **Robots:** `app/robots.ts` – allow index/follow.

---

## 9. Project Structure (Summary)

```
codemasti/
├── app/
│   ├── layout.tsx          # Root layout, metadata, schemas, ErrorBoundary, WhatsApp
│   ├── page.tsx            # Home
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── about/
│   ├── contact/
│   ├── programs/
│   ├── register/           # + result
│   ├── pay-test/           # + result
│   ├── terms/, privacy/, refund/
│   └── api/
│       ├── register/       # POST – register + sheet + emails
│       ├── newsletter/    # POST – waitlist + email
│       ├── contact/       # POST – contact + sheet + admin email
│       └── phonepe/
│           ├── create-payment/
│           ├── status/
│           └── config-check/
├── components/             # Particles, modals, messages, ErrorBoundary, WhatsApp
├── lib/
│   ├── api-client.ts
│   ├── email.ts            # Nodemailer sendEmail
│   ├── google-sheets.ts    # Sheet init, append, duplicate check
│   ├── phonepe.ts          # Token, createPayment, status
│   ├── error-messages.ts
│   └── seo-utils.ts
├── public/                 # Images, logos
├── scripts/                # reset-google-sheet, verify-google-sheets-setup
└── *.md                    # README, EMAIL_SETUP, GOOGLE_SHEETS_SETUP, PHONEPE_SETUP, etc.
```

---

## 10. Environment Variables (Summary)

| Variable | Purpose |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. https://codemasti.com) |
| `NEXT_PUBLIC_APP_URL` | App URL for PhonePe redirects |
| `GOOGLE_SHEET_ID` | Spreadsheet for registrations, contact, newsletter |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Sheets API |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Google Sheets API |
| `GOOGLE_PROJECT_ID` | Google Sheets API |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | Email (Nodemailer) |
| `PHONEPE_CLIENT_ID`, `PHONEPE_CLIENT_SECRET` | PhonePe API |
| `PHONEPE_SANDBOX` | Use sandbox vs production |
| `PHONEPE_CLIENT_VERSION` | Optional, default 1 |

---

## 11. Scripts & Documentation

- **npm run dev** – Local dev server.  
- **npm run build** / **npm run start** – Production build and run.  
- **npm run reset:sheet** – Reset Google Sheet (scripts/reset-google-sheet.ts).  
- **Docs in repo:** README.md, EMAIL_SETUP.md, GOOGLE_SHEETS_SETUP.md, PHONEPE_SETUP.md, ERROR_HANDLING_IMPLEMENTATION.md, SEO_OPTIMIZATION.md, and related guides.

---

## 12. Summary in One Paragraph

**CodeMasti** is a Next.js 14 (TypeScript, Tailwind) marketing and registration site for a K–10 coding education product in India. It uses a launch countdown and newsletter on the home page; Programs and Register pages describe three batches (SPARK, BUILDERS, INNOVATORS) and scholarship tiers and collect registrations with optional PhonePe payment or “Pay Later.” Registrations, contact form, and newsletter signups are stored in one Google Sheet and trigger transactional emails via SMTP (Nodemailer). The app includes About, Contact, Terms, Privacy, Refund, and a pay-test flow, with shared components, error handling, SEO (metadata, JSON-LD, sitemap), and a floating WhatsApp button.
