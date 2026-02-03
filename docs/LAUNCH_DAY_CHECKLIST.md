# CodeMasti — Launch Day Checklist

**Platform Launch Date:** **5 February 2026 (Wednesday)**  
**Launch Time:** Midnight IST (00:00:00) — countdown hits zero and registration opens automatically.

**Related dates:**
- Counselling & Admission Start: February 2026  
- First Batch Classes Begin: **2 May 2026 (Saturday)**

Use this doc as a runbook for what to do **before**, **on**, and **right after** launch day.

---

## 1. Launch Day at a Glance

| When | What happens |
|------|-----------------------------|
| **5 Feb 2026, 00:00 IST** | Countdown hits zero → 3… 2… 1… → party animation → **Registration opens** on the website. |
| **Same day** | Homepage shows “Registration Open” hero; users can register and pay (PhonePe) or choose Pay Later. |
| **Feb 2026** | Counselling & admissions; follow-up with registrations. |
| **2 May 2026** | First batch classes begin. |

---

## 2. Before Launch (Day Before — 4 February 2026)

### Technical

- [ ] **Website live** — Confirm codemasti.com (or your live URL) is up and fast.
- [ ] **SSL / HTTPS** — Certificate valid; no browser warnings.
- [ ] **Homepage** — Countdown shows correct time (e.g. “0 days” or “< 24 hours”); no broken images (hero, logo).
- [ ] **Registration flow** — Open `/register`, fill form, submit. Confirm:
  - [ ] Form submits without error.
  - [ ] Row appears in Google Sheet (Timestamp, Name, Email, Phone, Batch, Payment Ref, Payment Status).
  - [ ] User receives confirmation email.
  - [ ] Admin receives notification email at info.codemasti@gmail.com.
- [ ] **Pay Now (PhonePe)** — Create a test registration with “Pay Now”; complete payment (or sandbox); confirm redirect back to result page and that `paymentMerchantOrderId` / Payment Status are stored.
- [ ] **Pay Later** — Submit registration with “Pay Later”; confirm sheet shows “Pay Later” and emails sent.
- [ ] **Contact form** — Submit a test message; confirm sheet update and admin email.
- [ ] **Newsletter** — Submit email on homepage; confirm sheet and welcome email.
- [ ] **Duplicate registration** — Try registering the same email twice; second attempt should get “already registered” (409) message.
- [ ] **Env & secrets** — All env vars set on hosting (Vercel/etc.): `GOOGLE_SHEET_ID`, Google credentials, SMTP, PhonePe (use production if going live). No secrets in repo.

### Content & Legal

- [ ] **Terms, Privacy, Refund** — Final read; links in footer work.
- [ ] **Programs page** — Dates, pricing, scholarship tiers (Feb/Mar/Apr) and batch info are correct.
- [ ] **About / Contact** — Phone, email, WhatsApp link correct.

### Communication Prep

- [ ] **Waitlist / newsletter list** — Export ready (e.g. from sheet or email tool) for “We’re live!” email.
- [ ] **Launch announcement** — Short draft (email + social) prepared: “CodeMasti is live. Registration open. 75% early-bird till 28 Feb. Link: [URL].”
- [ ] **Social posts** — Drafts for LinkedIn, Instagram, Twitter/X, etc., ready to post on 5 Feb morning.

### Access & Ownership

- [ ] **Google Sheet** — Shared with the right people; backup or copy if needed.
- [ ] **Email (SMTP)** — Sending limit and reputation OK; test from production.
- [ ] **PhonePe** — Production credentials and webhook/redirect URLs configured; small test transaction if possible.
- [ ] **Domain & hosting** — Renewal not due; team has login access.

---

## 3. On Launch Day — 5 February 2026

### At Midnight (00:00 IST)

- [ ] **Watch the site** — Open homepage in an incognito window. Countdown should hit 0 → 3, 2, 1 → party → registration-open hero.
- [ ] **One real registration** — Complete one full registration (Pay Now or Pay Later) to confirm end-to-end flow on launch day.
- [ ] **Check sheet & email** — New row in sheet; user and admin emails received.

### Morning (e.g. 8:00–10:00 AM IST)

- [ ] **Site check** — Homepage, /programs, /register, /contact load correctly on mobile and desktop.
- [ ] **Registration** — Submit one more test from a different device/browser.
- [ ] **Payments** — If using production PhonePe, do one small real payment and confirm success and sheet update.
- [ ] **Send “We’re live” email** — To full waitlist/newsletter list with link to register and early-bird message.
- [ ] **Post on social** — Publish launch announcement (LinkedIn, Instagram, Twitter/X, etc.).
- [ ] **WhatsApp / personal** — Share link with close network and any school/parent groups you’re already in.

### Through the Day

- [ ] **Monitor Google Sheet** — New registrations appearing; no duplicate emails (handled by app).
- [ ] **Monitor inbox** — info.codemasti@gmail.com for support or failed emails; reply to queries same day.
- [ ] **Check for errors** — If you have basic monitoring or server logs, skim for 5xx or spike in errors.
- [ ] **Answer DMs / comments** — Respond to congratulatory or question posts on social.

---

## 4. First 24–48 Hours After Launch

- [ ] **Review registrations** — Count by batch (SPARK / BUILDERS / INNOVATORS) and payment status (Paid vs Pay Later).
- [ ] **Follow up Pay Later** — Send a short template (email/WhatsApp) with payment link or instructions.
- [ ] **Fix any one-off issues** — Wrong email, typo in sheet, missed admin email; document so you can improve process.
- [ ] **Backup sheet** — Download or copy “Registrations” (or full sheet) as of end of Day 1 and Day 2.
- [ ] **Thank-you post** — “Thank you to everyone who registered on Day 1. Early-bird 75% still on till 28 Feb.”

---

## 5. What You Don’t Need to Do on Launch Day

- **Change code at midnight** — Registration opens automatically when the countdown hits zero (no deploy needed at 00:00).
- **Manually “flip” the site** — The app already switches from countdown to “registration open” by date/time.
- **Approve each registration by hand** — Sheet and emails handle it; follow up later for Pay Later or exceptions.

---

## 6. If Something Goes Wrong

| Issue | What to do |
|-------|------------|
| **Site down** | Check hosting status (e.g. Vercel); redeploy if needed; post “We’re fixing it, back in X minutes” on social. |
| **Registration form error** | Check API logs (e.g. Vercel Functions); confirm env vars (Google, SMTP); if sheet is full or permissions wrong, fix and retry. |
| **Emails not sending** | Check SMTP limits and credentials; send test from server; if needed, tell users “Confirmations may be delayed.” |
| **Payment fails** | Check PhonePe dashboard and redirect URL; if production issue, consider temporarily promoting “Pay Later” and paying later. |
| **Wrong date/time** | Launch is driven by `platformLaunchDate` (2026-02-05T00:00:00) in code; if you must change it, update and redeploy. |
| **Duplicate or spam registrations** | App blocks duplicate email; if you see spam, add simple rate-limit or captcha in a follow-up iteration. |

---

## 7. Quick Reference — Launch Date in Code

- **File:** `app/page.tsx`  
- **Variable:** `platformLaunchDate = new Date("2026-02-05T00:00:00+05:30").getTime()` (midnight IST)  
- **Behaviour:** When `Date.now() >= platformLaunchDate`, countdown stops, 3–2–1–party runs, then `registrationStarted` is set to `true` and the “Registration Open” hero is shown.

If you ever need to change the launch date, update this date in `app/page.tsx` and any copy on the site (e.g. “5 February 2026” on homepage and programs).

---

## 8. Summary Checklist (Print or Share)

**4 Feb (Day before)**  
- [ ] Full test: register, pay, contact, newsletter  
- [ ] Emails and sheet checked  
- [ ] Launch email and social posts drafted  
- [ ] Env and PhonePe production ready  

**5 Feb (Launch day)**  
- [ ] 00:00 — Watch countdown → registration open; do one test registration  
- [ ] Morning — Site check; send waitlist email; post on social  
- [ ] Through day — Monitor sheet and inbox; reply to queries  

**6–7 Feb**  
- [ ] Review registrations; follow up Pay Later; backup sheet; thank-you post  

---

## 9. Extra Suggestions for Launch Day

### Technical
- **Launch time (IST):** The site now uses `2026-02-05T00:00:00+05:30` so the countdown ends at **midnight IST for everyone** (India and abroad). No change needed at 00:00.
- **One more test from a “cold” device:** Use a phone or another browser you haven’t used for testing (or incognito) and do one full registration. Catches cache/cookie issues.
- **Speed:** Run the live site through [PageSpeed Insights](https://pagespeed.web.dev/) or similar; fix any obvious images or assets if load is slow on mobile.

### Communication
- **Clear CTA in posts:** Every launch post should have one link: “Register now” → `https://codemasti.com/register` (or your live URL). Add UTM params if you track (e.g. `?utm_source=instagram&utm_campaign=launch`).
- **One-line pitch:** Keep it consistent: “CodeMasti is live. Coding for Class 5–10. 75% early-bird till 28 Feb. Register: [link].”
- **Parents, not just kids:** Emphasise “affordable,” “small batches,” “logic first” and “next steps” (counselling, batch start date) so parents know what happens after they register.

### On the day
- **Someone on standby:** Have at least one person (founder or team) free for 1–2 hours around midnight and again in the morning to handle “site not opening,” “payment not working,” or “didn’t get email” messages (WhatsApp, email, DMs).
- **Screenshot/video:** Record the 3–2–1–party moment at midnight (screen record or phone) for a short “We’re live!” story or reel.
- **First 10 registrations:** Consider a quick personal thank-you (email or WhatsApp) to the first few families; it builds loyalty and word of mouth.

### If you have a small waitlist
- **Segment the email:** Send “We’re live” to waitlist first (e.g. 8–9 AM), then post on social 30–60 minutes later so they get a head start and feel special.
- **Reminder:** Send a gentle “Last 24 hours for 75% early-bird” type reminder a day before 28 Feb (or your early-bird end date).

---

*CodeMasti — Think. Solve. Create.*
