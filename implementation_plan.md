# Resolve AI — Autonomous Multi-Agent Platform for Ethical & Intelligent Debt Resolution

## Overview

**Project:** Resolve AI  
**Title:** Autonomous Multi-Agent Platform for Ethical & Intelligent Debt Resolution  
**Stack:** Plain HTML + CSS + Vanilla JavaScript (multi-page app)  
**Color Palette:** Light/Soft Purple + White + Deep Indigo (professional, clean)  
**Target Audience:** Both Banks/Lenders AND Borrowers (dedicated sections for each)

A stunning, interactive, multi-page frontend website for a debt resolution platform that uses AI agents to ethically resolve debt between lenders and borrowers.

---

## Pages to Build

| File | Purpose |
|------|---------|
| `index.html` | Main landing page (full scrolling) |
| `dashboard.html` | Bank/Lender admin dashboard (Master Agent control panel) |
| `borrower.html` | Borrower portal (chat + repayment plan + status tracker) |
| `style.css` | Global design system |
| `dashboard.css` | Dashboard-specific styles |
| `borrower.css` | Borrower portal styles |
| `main.js` | Landing page interactions |
| `dashboard.js` | Dashboard simulated data & interactivity |
| `borrower.js` | Borrower portal chat simulation & calculator |

---

## Landing Page Sections (`index.html`)

### 1. 🔝 Navigation Bar
- Logo: Modern **'R' monogram** + "Resolve AI" wordmark
- Links: Home | How It Works | For Banks | For Borrowers | About | Contact
- CTA Button: **[Book Demo]** → triggers a modal popup

### 2. 🦸 Hero Section
- **Headline:** *"Resolving Debt. Restoring Lives."*
- **Subtitle:** *"AI-powered multi-agent platform that ethically resolves debt — for banks that want recovery and borrowers who deserve dignity"*
- Two CTAs: [Book Demo] + [See How It Works]
- **Right side:** Animated simulated AI chat/call conversation bubble between Agent and Borrower
- Soft purple wave/particle background animation

### 3. 📊 Stats Bar
- ₹500Cr+ Debt Managed
- 95% Resolution Rate
- 10,000+ Borrowers Helped
- 3x Faster Recovery
- *(Labelled as "Projected / Demo Figures")*
- Animated count-up on scroll

### 4. ⚙️ How It Works (3 Steps)
- **Step 1:** Upload borrower list (Excel/JSON/CSV) → drag & drop card
- **Step 2:** AI agents reach out via WhatsApp/Email/SMS/Calls
- **Step 3:** Track recovery & improve strategy with analytics
- Visual icons + animated connections between steps

### 5. 🤖 Agent Pipeline (Animated Flowchart)
- **Master Agent** at top
- Branches into Sub-Agents:
  - Agent 1: Chat Outreach (WhatsApp/Email/SMS)
  - Agent 2: Voice Call
  - Agent 3: Legal Notice + Govt Regulations
  - Agent 4: Human Escalation
- Each node has: status indicator (Active/Idle/Alert), borrower count, success %
- Animated connecting lines with flow direction arrows
- Master Agent "monitors & repairs" indicator

### 6. ✨ Features Grid
- Customer Segmentation by risk
- AI agents for every conversation
- Multilingual Support (22 Indian languages)
- No repeated questions across channels
- Ethical, regulation-compliant approach
- Master Agent oversight & self-healing

### 7. 🏦 For Banks Section
- Drag & drop file upload UI (Excel/JSON/CSV)
- Feature list: ROI calculator, compliance badges (RBI, IBC, SARFAESI)
- "Before vs After Resolve AI" comparison graph (similar to reference images)

### 8. 👤 For Borrowers Section
- What borrowers can expect: empathy, flexible repayment, dignity
- Regulatory information: RBI FLDG, SARFAESI Act, IBC, CIBIL score impact
- Language selector (dropdown with all 22 scheduled Indian languages)

### 9. 🌐 Multilingual Support Section
- Language selector dropdown (all 22 scheduled Indian languages of India)
- Feature cards: Multilingual, naturally | Mute out the noise | Verification. Patience. Persistence.
- Simulated sample conversations in different languages

### 10. 💬 Testimonials / Social Proof
- 3-4 testimonial cards from fictional banks & borrowers (demo data)

### 11. 📈 Impact Section
- "Before Resolve AI" vs "After Resolve AI" graph (like reference images)
- DPD0 → DPD10 → DPD30 recovery curve comparison

### 12. 📞 CTA Section
- Final call to action: "Ready to Transform Debt Recovery?"
- [Book Demo] button → same modal

### 13. 🔻 Footer
- Logo + Tagline: **"Resolve. Recover. Restore."**
- Navigation links
- Social media icons
- Legal disclaimer about demo data

---

## Book Demo Modal
- Fields: Name, Company/Bank Name, Email, Phone, Loan Portfolio Size
- Submit button → shows success confirmation animation

---

## Bank Admin Dashboard (`dashboard.html`)

### Layout
- Sidebar navigation: Overview | Borrowers | Agents | Analytics | Settings
- Top bar: Master Agent Status indicator

### Main Panel
- **Master Agent Control Panel** — shows all active sub-agents
- Each agent card: Current Borrower | Stage (Chat/Call/Legal/Escalated) | Success Rate
- **Live Activity Log** — scrolling real-time feed of agent actions
- **Analytics charts:** Recovery curve, channel performance, resolution rates
- **Borrower Table:** filterable list with status, agent assigned, last contact

### Demo Data
- 8–12 simulated borrowers across different stages
- Agents showing realistic activity (typing, calling, waiting for response)

---

## Borrower Portal (`borrower.html`)

### Layout
- Clean, friendly UI (less corporate, more empathetic design)
- Sidebar: My Debt | Chat with Agent | Repayment Plan | My Documents

### Main Features
1. **Chat Interface** — conversation history with the AI agent (animated, realistic)
2. **Debt Status Tracker** — progress bar: Current → In Negotiation → Agreed → Resolved
3. **Repayment Plan Calculator** — enter monthly income, see suggested EMI plans
4. **Debt Summary card** — loan amount, outstanding, lender name, due date

---

## Design System (CSS)

| Token | Value |
|-------|-------|
| Primary | `#4B3FA0` (Deep Indigo) |
| Secondary | `#7C6FCD` (Soft Purple) |
| Accent | `#A78BFA` (Lavender) |
| Background | `#F8F7FF` (Off-white with purple tint) |
| Surface | `#FFFFFF` |
| Dark | `#1E1B4B` (Very dark indigo) |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Font | Inter (Google Fonts) |

- Glassmorphism cards with subtle blur effects
- Smooth scroll-triggered animations
- Hover micro-animations on all interactive elements
- Gradient hero background with animated wave

---

## Verification Plan

### Manual Verification
- All 3 pages render correctly in browser
- Navigation links scroll to correct sections
- Book Demo modal opens/closes correctly
- Animated agent flowchart renders and animates
- Dashboard shows realistic demo data with live activity log
- Borrower chat simulation types and responds
- Repayment calculator computes and shows EMI plans
- File upload drag-and-drop zone works visually
- Responsive layout works on mobile

---

> [!NOTE]
> All data is simulated/demo. No real backend connections. The dashboard and borrower portal are fully interactive demos powered by JavaScript with realistic fake data.

> [!IMPORTANT]
> The website is built as a **pitch/demo product** — perfect for showcasing to investors, banks, or stakeholders. Backend integration can be added in a future phase.
