<div align="center">

<img src="https://atom-md.vercel.app/logo.png" alt="Atom-MD Logo" width="120" />

# ⚛️ ATOM-MD

### *The Ultimate WhatsApp Automation Engine*

[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/atlas)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=for-the-badge&logo=socket.io)](https://socket.io)

> **AI-powered · Lightning-fast · Ultra-Lite · Multi-session · Fully customizable**

</div>

---

## 🌟 Overview

**Atom-MD** is a next-generation WhatsApp bot engine built for power users and developers who demand performance without compromise. Engineered to run flawlessly on servers with as little as **512MB RAM**, Atom-MD leverages external APIs, MongoDB-backed sessions, and real-time WebSocket communication to deliver enterprise-grade automation on minimal hardware.

Whether you want to automate your WhatsApp presence, deploy AI-powered replies, protect your privacy, or manage multiple bot sessions from a single dashboard — Atom-MD is the engine for you.

---

## ✨ Core Features

### 🤖 AI Integration
- Conversational AI powered by **Google Gemini** and **Gemma 31B** (heavy model)
- **Vision AI** — analyze and describe images sent in chat
- **Image Generation** — generate stunning AI art from text prompts via Pollinations AI
- **Text-to-Voice** — convert AI responses to lifelike audio messages
- **Text Summarization** — condense long passages instantly
- **Grammar Correction** — polish and fix writing in seconds

### 🛡️ Privacy & Security
- **Anti-Delete** — automatically recovers deleted messages and forwards them to your inbox
- **Anti-ViewOnce** — intercepts view-once media and saves it before it disappears
- **Anti-Call** — auto-rejects incoming calls with a customizable message and audio response
- HMAC-signed WebSocket authentication for dashboard security
- reCAPTCHA verification layer on sensitive API endpoints

### ⚙️ Smart Automation
- **Auto Status Viewer** — silently views and reacts to all contacts' statuses 24/7
- **Auto Status Saver** — automatically saves status updates to your inbox
- **Smart Auto-Replies** — up to 6 keyword-triggered auto-reply slots with image support and per-slot cooldowns
- **Target Tracker** — send a one-time auto-message when a specific contact messages you
- **Inbox Auto React** — automatically react to incoming messages with a custom emoji
- **Fake Typing / Recording** — simulate presence indicators to appear active

### 🌐 Web Dashboard
- Connect via **QR Code** or **Pairing Code** — no manual setup
- Beautiful glassmorphic user interface served via an external frontend (e.g., Vercel)
- Real-time session management via **Socket.io** live events
- Per-session settings panel: toggle AI, privacy features, auto-replies, and more
- Receive your dashboard password directly inside WhatsApp on first connection

### 👑 Admin Panel
- Manage **all connected sessions** globally from a single panel
- View live system RAM usage and per-session stats
- Inspect individual bot settings including auto-reply configurations
- Force-delete any session and wipe its data from the database instantly
- Admin access secured by a master password defined in `.env`

### ⚡ Performance & Architecture
- **Ultra-Lite by design** — no local media processing; all heavy tasks offloaded to APIs
- **MongoDB-backed sessions** — no filesystem auth state; safe for multi-instance deployments
- **Ghost Mode** — stays offline/invisible by default, even while fully active
- **Notification Fix** — messages are processed without triggering WhatsApp read receipts
- **Disk-based message store** — anti-delete works without eating RAM
- Supports up to **10 concurrent bot sessions** with automatic reconnection logic
- Channel Manager plugin for WhatsApp Channels with periodic health checks

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `@whiskeysockets/baileys` | WhatsApp Web API — core multi-device connection layer |
| `@google/genai` | Google Gemini & Gemma AI — chat, vision, image gen, TTS |
| `mongoose` | MongoDB ODM — session storage, settings, AI config |
| `socket.io` | Real-time bidirectional WebSocket communication |
| `express` | HTTP server & REST API layer |
| `cloudinary` | Cloud media storage for profile pictures & uploads |
| `axios` | HTTP client for external API calls |
| `pino` | High-performance structured logger |
| `node-cache` | In-memory TTL cache (settings, message retry) |
| `node-cron` | Scheduled background task runner |
| `multer` | Multipart form-data file upload handler |
| `qrcode` | Generates QR code PNG buffers for WhatsApp pairing |
| `qrcode-terminal` | Renders QR codes in terminal output |
| `cors` | Cross-origin resource sharing middleware |
| `dotenv` | Loads environment variables from `.env` |
| `form-data` | Constructs multipart form data for API requests |
| `fs-extra` | Extended filesystem utilities |
| `moment-timezone` | Timezone-aware date & time formatting |
| `adm-zip` | ZIP archive handling for file operations |
| `yt-search` | YouTube metadata search for media commands |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** database (MongoDB Atlas recommended — free tier works great)
- **Cloudinary** account (optional, for media uploads)


### 2. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# ─────────────────────────────────────────
#  DATABASE (REQUIRED)
# ─────────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/atommd

# ─────────────────────────────────────────
#  ADMIN PANEL (REQUIRED)
# ─────────────────────────────────────────
ADMIN_PASSWORD=your_secure_admin_password

# ─────────────────────────────────────────
#  SERVER
# ─────────────────────────────────────────
PORT=3000

# ─────────────────────────────────────────
#  CLOUDINARY — Profile Picture Uploads (Optional)
# ─────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ─────────────────────────────────────────
#  SECURITY
# ─────────────────────────────────────────
HMAC_SECRET=your_hmac_secret_key
RECAPTCHA_SECRET=your_recaptcha_secret
```

> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.

### 3. Install & Run
```bash
npm install
npm start
```

The bot engine starts up with a **3-minute initialization delay** to allow all sessions to restore cleanly. The web dashboard frontend runs separately (e.g., hosted on Vercel) and communicates with this backend via WebSockets.

---

## 🐳 Docker Deployment

A `Dockerfile` and `docker-compose.yml` are included for containerized deployments.

```bash
docker-compose up -d
```

---

## 📁 Project Structure

```
Atom-MD/
├── index.js              # 🧠 Main bot engine & WebSocket server
├── start.js              # 🚀 Startup script & session bootstrapper
├── config.js             # ⚙️  Global configuration & default settings
├── db.js                 # 🍃 MongoDB connection handler
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env                  # 🔒 Environment secrets (not committed)
└── src/
    ├── commands/         # 📂 Modular command handlers
    ├── plugins/
    │   └── channelManager.js   # 📡 WhatsApp Channels manager
    ├── lib/
    │   ├── models.js           # 🗄️  Mongoose schemas (Session, Settings, AI)
    │   ├── mongoAuth.js        # 🔐 MongoDB-backed Baileys auth state
    │   └── voice.MP3           # 🔊 Anti-call audio response
    └── security/
        ├── hmac.js             # 🛡️  HMAC request signing & verification
        └── recaptcha.js        # 🤖 Google reCAPTCHA token validation
```

---

## 🌐 How It Works

```
User's WhatsApp ←──→ Baileys (WA Web API)
                           │
                       index.js (Engine)
                      ┌────┴────┐
                   MongoDB    Socket.io
                  (Sessions)  (Dashboard)
                      └────┬────┘
                     Vercel Frontend
                    (User / Admin UI)
```

1. **Session Lifecycle** — Each bot session is identified by the user's phone number. On first connection, credentials are stored in MongoDB and loaded on every reconnect.
2. **Real-time Events** — QR codes, pairing codes, connection status, and session lists are pushed live to the dashboard via Socket.io.
3. **Message Processing** — Incoming messages are filtered, deduplicated, and routed through the feature pipeline (anti-delete → auto-replies → AI → commands).
4. **Ghost Mode** — The bot marks itself as offline after every action, maintaining complete invisibility.

---

## 🔒 Security Highlights

- All WebSocket connections are authenticated via **HMAC-SHA256** time-based tokens
- File upload endpoints are protected with HMAC middleware
- reCAPTCHA verification prevents bot abuse on pairing endpoints
- Session data is fully isolated per user — no cross-session data leakage
- Admin panel is password-protected and requires a separate credential

---

<div align="center">

Made with ❤️ by **[sh4lu-z](https://github.com/sh4lu-z)**

*© 2026 Atom-MD Engine. All Rights Reserved.*

⭐ **Star this repo if Atom-MD powers your automation!** ⭐

</div>
