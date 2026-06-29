-- ===========================================================================
-- Migration: add the certificates feature.
-- Run this in the Supabase SQL Editor (you already ran supabase_schema.sql).
-- ===========================================================================

create table if not exists public.certificates (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  issuer         text not null default '',
  issued_date    date,
  file_url       text not null,
  file_type      text not null default 'image'
                   check (file_type in ('image', 'pdf')),
  credential_url text,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

create index if not exists certificates_sort_idx on public.certificates (sort_order);

-- Public read; authenticated (admin) write — same model as projects.
alter table public.certificates enable row level security;

drop policy if exists "public read certificates" on public.certificates;
create policy "public read certificates"
  on public.certificates for select
  using (true);

drop policy if exists "authenticated write certificates" on public.certificates;
create policy "authenticated write certificates"
  on public.certificates for all
  to authenticated
  using (true)
  with check (true);

-- Certificate files (images + PDFs) reuse the existing public 'project-media'
-- bucket, so no new storage setup is needed.
