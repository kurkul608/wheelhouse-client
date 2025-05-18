
---

## `wheelhouse-client` — README.md

```markdown
# Wheelhouse Client

Front-end for the **Wheelhouse** Telegram Mini App – a slick, cache-first car catalogue built with Next JS 15 & the Telegram Web Apps SDK.

> ⏱️ **Delivered in 30 days** alongside the API.

---

## ✨ Highlights

* **Instant feel** – SSR + smart client-side caching make scroll & search fly, even on mobile data.
* **Seamless Telegram UX** – adapts to Web Apps colour themes, viewport resizing, and back-button expectations.
* **S3-optimised images** – cars images are transformed & served from AWS S3 with signed URLs.
* **Manager live-chat deep-links** – one-tap jump from a car page straight into a Telegram chat with the correct manager.
* **Offline-ready catalogue** – service worker keeps previously visited car pages available without network.

---

## 🛠 Stack

| Area | Tech |
|------|------|
| Framework | Next JS 15 (App Router, TypeScript) |
| UI layer | Tailwind CSS + Radix UI primitives |
| State & data | TanStack Query, Zod for runtime types |
| Messaging | Telegram Mini Apps SDK (`@telegram-apps/webapp`) |
| Image hosting | AWS S3 (`@aws-sdk/client-s3` signed URLs) |
| Lint/format | eslint, prettier, stylelint |

---

## 🚀 Quick start

### Prerequisites

* **Node >= 22**
* **pnpm >= 8**

### 1. Clone & install

```bash
git clone https://github.com/your-org/wheelhouse-client.git
cd wheelhouse-client
pnpm install
