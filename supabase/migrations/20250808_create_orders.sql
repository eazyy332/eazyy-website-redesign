create extension if not exists pgcrypto;
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default confirmed,
  total_amount numeric not null default 0,
  schedule jsonb,
  address jsonb,
  payment_method text,
  payment_method_label text,
  contact_first_name text,
  contact_last_name text,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_id text not null,
  name text not null,
  service_category text not null,
  unit_price numeric not null,
  quantity integer not null,
  line_total numeric not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
