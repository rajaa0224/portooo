# Raja Malik Chaniago — Portfolio

A clean, no-frills portfolio site for a Computer Engineering student. Public
visitors see the hero, work-in-progress ("In The Lab"), and a project showcase.
A hidden admin area (reached by clicking **"Built with passion."** in the
footer) lets the owner add, edit, and delete projects.

Built with **React + Vite + TypeScript + Tailwind CSS + Supabase**.

## Sections

1. **Hero** — name, title, tagline, "View My Work" CTA (scrolls to projects),
   GitHub / LinkedIn links.
2. **In The Lab** — work-in-progress cards with stage label + progress bar.
3. **Project Showcase** — grid of completed projects → click for a modal →
   "View Build Details" → full detail page (description, BOM, schematic, code).
4. **Footer** — copyright with a hidden admin login on "Built with passion."
5. **Admin Dashboard** — add/edit/delete projects, image upload, status toggle.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

- Go to https://supabase.com and create a new project.
- In **Project Settings → API**, copy the **Project URL** and **anon public key**.

### 3. Configure environment

```bash
cp .env.example .env
```

Fill `.env` with your values:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Create the database schema

Open the Supabase **SQL Editor**, paste the contents of
[`supabase_schema.sql`](./supabase_schema.sql), and run it. This creates the
`projects` table, security policies, the `project-media` storage bucket, and a
few sample rows.

### 5. Create your admin login

In Supabase: **Authentication → Users → Add user**. Enter your email + password
and tick **Auto Confirm User**. Use those credentials at the hidden `/admin`
login (footer link).

### 6. Run

```bash
npm run dev
```

## Admin access

Click **"Built with passion."** in the footer (or go to `/admin`). After login
you can manage projects. The **status toggle** moves a project between
"In Progress" (shown in *In The Lab*) and "Completed" (shown in *Showcase*).

## Notes

- Project images and schematics upload to the `project-media` Supabase bucket.
- Public visitors can only read data; all writes require login (enforced by
  Supabase Row Level Security, not just the UI).
