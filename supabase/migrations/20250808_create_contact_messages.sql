create extension if not exists pgcrypto;
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
