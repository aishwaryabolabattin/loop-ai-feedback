# 🚀 Project LOOP

An AI-powered Customer Feedback Intelligence Platform built using **Next.js**, **Prisma**, **PostgreSQL (Neon)**, **Anthropic Claude AI**, and **OpenAI Embeddings**.

---

# 📖 Project Overview

Project LOOP helps organizations collect, analyze, and understand customer feedback using Artificial Intelligence.

The system automatically:

- Classifies customer feedback using AI
- Detects customer sentiment
- Identifies common themes
- Generates Voice of Customer (VoC) reports
- Supports semantic search using Ask LOOP
- Displays analytics on an interactive dashboard

---

# ✨ Features

- 📊 Dashboard Analytics
- 💬 Feedback Management (CRUD)
- 🤖 AI Feedback Classification
- 🔍 Ask LOOP (Semantic Search + RAG)
- 📈 Analytics Dashboard
- 🏷 Theme Detection
- 📄 Voice of Customer Reports
- 🖨 PDF Report Export
- 👥 Member Management
- ⚙ Settings
- 📱 Responsive Design
- ♿ Accessibility Support

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS

## Backend

- Next.js API Routes
- Prisma ORM

## Database

- PostgreSQL (Neon)

## AI Services

- Anthropic Claude API
- OpenAI Embeddings

## Deployment

- Vercel

---

---

# 🏗 System Architecture

```text
                    User
                      │
                      ▼
          Next.js Frontend (React)
                      │
                      ▼
            Next.js API Routes
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
  Anthropic Claude AI        OpenAI Embeddings
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Prisma ORM
                      │
                      ▼
            PostgreSQL (Neon Database)
```

---

# 🔄 Application Flow

```text
Customer Feedback
        │
        ▼
Feedback API
        │
        ▼
Claude AI Classification
        │
        ▼
Store in PostgreSQL
        │
        ▼
Dashboard Analytics
        │
        ▼
Ask LOOP
        │
        ▼
Voice of Customer Report
        │
        ▼
PDF Export
```

# 📂 Project Structure

```text
Project-LOOP/
│
├── app/
│   ├── api/
│   │   ├── ask-loop/
│   │   ├── dashboard/
│   │   ├── feedback/
│   │   ├── reports/
│   │   └── members/
│   │
│   ├── dashboard/
│   ├── feedback/
│   ├── reports/
│   ├── ask-loop/
│   ├── analytics/
│   ├── themes/
│   ├── members/
│   ├── settings/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── dashboard/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ExportReportButton.jsx
│
├── lib/
│   ├── prisma.js
│   ├── ai.js
│   ├── embeddings.js
│   └── toast.js
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── public/
│   ├── screenshots/
│   └── icons/
│
├── README.md
├── package.json
└── next.config.js
```

---

# 📦 Project Modules

| Module    | Description                               |
| --------- | ----------------------------------------- |
| Dashboard | Displays AI-powered analytics and charts  |
| Feedback  | Manage customer feedback (CRUD)           |
| Analytics | Visualize customer sentiment and trends   |
| Themes    | AI-generated feedback themes              |
| Ask LOOP  | Semantic search with AI-generated answers |
| Reports   | Generate Voice of Customer reports        |
| Members   | Workspace user management                 |
| Settings  | Application settings                      |

---

# 🗄 Database Design

```text
Workspace
│
├── Users
│
├── Feedback
│
└── Reports
```

### Main Tables

- Workspace
- User
- Feedback
- Report

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/project-loop.git
```

Go to the project folder

```bash
cd project-loop
```

Install dependencies

```bash
npm install
```

Create environment variables

```text
.env.local
```

Run the development server

```bash
npm run dev
```

Open

```text
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env.local` file and add:

```env
DATABASE_URL=

DIRECT_URL=

ANTHROPIC_API_KEY=

OPENAI_API_KEY=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000
```

---

# 🗄 Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Push schema to database

```bash
npx prisma db push
```

(Optional) Seed the database

```bash
node prisma/seed.js
```

---

# 🚀 Production

Build the application

```bash
npm run build
```

Start the production server

```bash
npm start
```

---

# 🌐 Deployment

Deploy using **Vercel**.

Add these Environment Variables in the Vercel Dashboard:

- DATABASE_URL
- DIRECT_URL
- ANTHROPIC_API_KEY
- OPENAI_API_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL

---

# 📸 Screenshots

## Dashboard

![Dashboard](public/screenshots/dashboard.png)

---

## Feedback

![Feedback](public/screenshots/feedback.png)

---

## Analytics

![Analytics](public/screenshots/analytics.png)

---

## Themes

![Themes](public/screenshots/themes.png)

---

## Ask LOOP

![Ask LOOP](public/screenshots/ask-loop.png)

---

## Reports

![Reports](public/screenshots/reports.png)

---

## Report Details

![Report Details](public/screenshots/report-details.png)

---

## Members

![Members](public/screenshots/members.png)

---

## Settings

![Settings](public/screenshots/settings.png)

---

# 👩‍💻 Developer

**Aishwarya Bolabattin**

B.Tech – Computer Science Engineering

Software Developer

---

# 📜 License

This project is developed for educational and portfolio purposes.
