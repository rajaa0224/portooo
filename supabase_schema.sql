-- ===========================================================================
-- Raja Malik Chaniago — Portfolio: Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- ===========================================================================

-- 1) PROJECTS TABLE -------------------------------------------------------
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  summary          text not null default '',
  problem          text not null default '',
  full_description text not null default '',
  tech             text[] not null default '{}',
  image_url        text,
  status           text not null default 'in_progress'
                     check (status in ('in_progress', 'completed')),
  lab_stage        text,
  progress         int not null default 0 check (progress between 0 and 100),
  completion_date  date,
  bom              jsonb not null default '[]'::jsonb,
  schematic_url    text,
  source_code_url  text,
  code_notes       text,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_sort_idx on public.projects (sort_order);

-- 2) ROW LEVEL SECURITY ---------------------------------------------------
-- Anyone can READ projects (public portfolio).
-- Only authenticated users (the admin) can write.
alter table public.projects enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select
  using (true);

drop policy if exists "authenticated write projects" on public.projects;
create policy "authenticated write projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- 3) STORAGE BUCKET FOR IMAGES / SCHEMATICS -------------------------------
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

-- Public read of files in the bucket.
drop policy if exists "public read project-media" on storage.objects;
create policy "public read project-media"
  on storage.objects for select
  using (bucket_id = 'project-media');

-- Authenticated upload / update / delete.
drop policy if exists "authenticated write project-media" on storage.objects;
create policy "authenticated write project-media"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'project-media')
  with check (bucket_id = 'project-media');

-- ===========================================================================
-- 4) ADMIN USER
-- The site uses Supabase Auth (email + password). Create your admin login in:
--   Dashboard -> Authentication -> Users -> "Add user"
-- Enter your email + password and tick "Auto Confirm User".
-- That email/password is what you type at the hidden /admin login.
-- ===========================================================================

-- Optional: a couple of sample rows so the site isn't empty.
-- Comment out if you don't want seed data.
insert into public.projects
  (title, slug, summary, problem, full_description, tech, status, lab_stage, progress, completion_date, bom, source_code_url, code_notes, sort_order)
values
  ('Smart Farming Robot', 'smart-farming-robot',
   'Autonomous rover that monitors soil and waters crops.',
   'Small farms lack affordable automated monitoring of soil moisture and irrigation.',
   'A four-wheeled rover that patrols crop rows, reads soil moisture, and triggers targeted watering. Built around an ESP32 with a moisture sensor array and a pump relay.',
   array['C++','ESP32','IoT'], 'completed', null, 100, '2026-03-01',
   '[{"component":"ESP32 DevKit","quantity":"1"},{"component":"Soil moisture sensor","quantity":"4"},{"component":"Water pump + relay","quantity":"1"}]'::jsonb,
   'https://github.com/', 'Reads moisture over ADC, compares to threshold, drives pump relay; telemetry over MQTT.', 1),
  ('Mini-UPS', 'mini-ups',
   'Compact uninterruptible power supply for small electronics.',
   'Routers and microcontrollers lose power during brief outages.',
   'A Li-ion based mini UPS providing seamless 5V/12V backup with automatic switchover and charge management.',
   array['Hardware','Power'], 'in_progress', 'Hardware Assembly', 60, '2026-08-01',
   '[{"component":"18650 cells","quantity":"3"},{"component":"BMS board","quantity":"1"},{"component":"Boost converter","quantity":"1"}]'::jsonb,
   null, null, 2),
  ('Ichobot Line-Follower', 'ichobot-line-follower',
   'PID line-following robot for competition tracks.',
   'Line-follower robots drift on sharp curves without tuned control.',
   'A compact line-follower using an IR sensor array and a PID loop tuned for high-speed competition tracks.',
   array['C++','Arduino','Robotics'], 'completed', null, 100, '2025-12-01',
   '[{"component":"Arduino Nano","quantity":"1"},{"component":"IR sensor array","quantity":"1"},{"component":"TT motors","quantity":"2"}]'::jsonb,
   'https://github.com/', 'Error from sensor array feeds a PID controller; output sets differential motor PWM.', 3);
