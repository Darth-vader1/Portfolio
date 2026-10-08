# Olufemi Gbolahan — Developer Portfolio (Next.js + Supabase Auth & Custom Admin Dashboard)

This repository contains the full-stack developer portfolio for **Olufemi Gbolahan**, built with **Next.js (App Router)**, **TypeScript**, **React**, and integrated with **Supabase Authentication** & a custom **Admin Portal** (`/admin`).

---

## 🛠️ Tech Stack & Features

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL Database & Email/Password Authentication)
- **Admin Dashboard**: Custom protected dashboard at `/admin` (Tabbed editor for Bio, Projects, Services, Skills, and Contact Messages viewer)
- **Styling & Fonts**: Google Fonts (`Syne` & `DM Sans`), CSS Variables, SVG noise texture overlay
- **Contact Form**: Direct insertion into Supabase `contact_messages` table + Formspree backup

---

## 📂 Project Structure

```text
portfolio/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx        # Supabase Admin Login Page
│   │   └── page.tsx            # Protected Admin Dashboard
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Main Portfolio Home Page
│   └── globals.css             # Global Stylesheet
├── components/
│   ├── admin/                  # Dashboard editor components
│   │   ├── BioEditor.tsx
│   │   ├── ProjectsEditor.tsx
│   │   ├── ServicesEditor.tsx
│   │   ├── SkillsEditor.tsx
│   │   └── MessagesViewer.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx             # Contact form writing to Supabase
│   ├── Footer.tsx
│   └── BackToTop.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase Client
│   │   └── server.ts           # Server Supabase Client
│   └── content.ts              # Data fetcher & types
├── data/                       # Local JSON content files (backup)
├── .env.local                  # Supabase Credentials (URL & ANON KEY)
├── supabase-schema.sql         # SQL Script to set up database tables
├── package.json
└── tsconfig.json
```

---

## 🔑 Supabase Setup Guide

### Step 1: Create a Supabase Project
1. Sign up/log in at [supabase.com](https://supabase.com/).
2. Create a new project.
3. Go to **Project Settings > API** and copy your **Project URL** and **anon / public Key**.

### Step 2: Set Environment Variables
Add your credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Step 3: Run Database Setup Script
1. In Supabase Dashboard, go to **SQL Editor**.
2. Copy the entire contents of [supabase-schema.sql](file:///c:/Users/HP/Documents/job/portfolio/supabase-schema.sql) and paste it into the editor.
3. Click **Run**. This will create the required tables (`bio`, `services`, `projects`, `skills`, `tools`, `contact_messages`) and Row-Level Security policies.

### Step 4: Create Admin User Account
1. In Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User > Create User**.
3. Enter your admin email and password. You can now use these credentials to log into `http://localhost:3000/admin/login`!

---

## 🚀 Running the App

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit:
- Portfolio Site: **`http://localhost:3000`**
- Admin Portal: **`http://localhost:3000/admin/login`**

---

## 📜 License
MIT License
