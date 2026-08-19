-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  phone text,
  course_id integer not null,
  plan_name text not null,
  amount numeric not null,          -- whole THB (baht)
  payment_method text not null,     -- 'card' | 'promptpay' | 'bank_transfer' | 'line'
  omise_charge_id text,
  status text not null default 'pending', -- pending | successful | failed | expired | reversed | pending_manual
  created_at timestamptz not null default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  course_id integer not null,
  order_id uuid references orders(id),
  created_at timestamptz not null default now(),
  unique (email, course_id)
);

create index if not exists orders_email_idx on orders (email);
create index if not exists orders_omise_charge_id_idx on orders (omise_charge_id);
create index if not exists enrollments_email_course_idx on enrollments (email, course_id);

-- These tables are only ever touched by the server (Vercel functions) using the
-- Supabase service role key, which bypasses Row Level Security entirely — so RLS
-- is enabled with no policies, blocking all access from the public anon key.
alter table orders enable row level security;
alter table enrollments enable row level security;
