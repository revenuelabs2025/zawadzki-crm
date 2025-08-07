create table if not exists public.profiles (
  id serial primary key,
  full_name text,
  login text unique not null,
  pass text not null,
  created_at timestamptz default now()
);

-- Allow anonymous access for simple login/registration flows
alter table if exists public.profiles enable row level security;

-- Permit anyone (anon) to read profile rows
create policy "profiles_select_anon" on public.profiles
for select
to anon
using (true);

-- Permit anyone (anon) to create new profile rows
create policy "profiles_insert_anon" on public.profiles
for insert
to anon
with check (true);

create table if not exists public.stages (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  color text,
  "order" int
);

insert into public.stages (name, color, "order") values
  ('Analiza techniczna', 'blue', 1),
  ('Wstępny kosztorys', 'teal', 2),
  ('Oferta handlowa wysłana', 'purple', 3),
  ('Negocjacje / rewizje', 'orange', 4),
  ('Wstrzymane', 'gray', 5),
  ('Wygrane', 'green', 6),
  ('Przegrane', 'red', 7)
on conflict (name) do nothing;

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid references public.stages(id) on delete set null,
  company_id uuid references public.companies(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  project_name text,
  roof_tech text,
  area_m2 numeric,
  value_net numeric,
  probability int,
  open_date date,
  expected_close date,
  margin int,
  start_date date,
  location text,
  investor_type text,
  object_type text,
  structure_type text,
  insulation_type text,
  acquisition_source text,
  hold_reason text,
  lost_reason text,
  created_at timestamptz default now()
);
