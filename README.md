# Olufemi Gbolahan — Developer Portfolio & Decap CMS

This repository contains the full-stack developer portfolio for **Olufemi Gbolahan**, now powered by **Decap CMS** (a Git-based Headless Content Management System).

---

## 🛠️ Tech Stack & Features

- **Frontend**: HTML5, CSS3 (Custom Variables, Syne & DM Sans fonts, CSS Grid/Flexbox), Vanilla JS.
- **Content Management System**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS).
- **Data Format**: Dynamic `JSON` files stored under `data/` (`bio.json`, `projects.json`, `skills.json`, `services.json`).
- **Contact Form**: Integrated with Formspree AJAX submission.

---

## 📂 Project Structure

```text
portfolio/
├── admin/
│   ├── index.html        # Decap CMS admin app entry point
│   └── config.yml        # CMS collections and field definitions
├── data/
│   ├── bio.json          # Hero info, bio text, social links, contact info
│   ├── projects.json     # Selected portfolio projects
│   ├── services.json     # Services offered
│   └── skills.json       # Tech skills proficiency & tool chips
├── index.html            # Portfolio frontend template
├── styles.css            # Custom CSS styling
├── script.js             # Dynamic CMS data loader & UI animations
├── resume.docx           # Downloadable CV
└── README.md
```

---

## 🖥️ How to Use the CMS

### 1. Local CMS Editing (Offline / Local Dev)

Decap CMS includes a local proxy server so you can test editing your content offline without pushing commits to GitHub first.

1. Open your terminal in the portfolio directory.
2. Start the local Decap server:
   ```bash
   npx decap-server
   ```
3. In another terminal (or live server extension), serve your portfolio website (e.g., using VS Code Live Server or Python HTTP server):
   ```bash
   python -m http.server 8000
   ```
4. Navigate to `http://localhost:8000/admin/` in your browser. You can now edit bio details, add new projects, update skills, and save changes locally into `data/*.json`!

---

### 2. Production CMS Setup (Hosting Options)

#### Option A: Hosting on Netlify (Recommended - Simplest CMS Auth)
1. Push your code to GitHub.
2. Connect your repository to **Netlify**.
3. In Netlify Dashboard:
   - Go to **Site Settings > Identity** -> Click **Enable Identity**.
   - Scroll to **Services > Git Gateway** -> Click **Enable Git Gateway**.
   - Under **Identity > Registration**, set access to *Invite Only* (so only you can log into your admin panel).
   - Invite yourself under **Identity > Invite Users**.
4. Go to `https://your-portfolio-domain.netlify.app/admin/` to log in and manage your portfolio content live.

#### Option B: Hosting on GitHub Pages / Vercel
1. You can use **GitHub OAuth** with an authentication provider like `OAuth-Host` or Decap Auth for authentication.
2. Direct edits in `data/*.json` or via `/admin/` will trigger automatic deployments.

---

## 📜 License
MIT License
