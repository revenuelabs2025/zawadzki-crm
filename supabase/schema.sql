create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id serial primary key,
  full_name text,
  login text unique not null,
  pass text not null,
  created_at timestamptz default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nip text,
  address text,
  city text,
  voivodeship text,
  website text
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  type text,
  source text,
  last_activity_date date,
  company_id uuid references public.companies(id)
);

create or replace function public.add_contact_with_company(
  company_data jsonb,
  contact_data jsonb
)
returns uuid
language plpgsql
as $$
declare
  new_company_id uuid;
  new_contact_id uuid;
begin
  if company_data ? 'name' and company_data->>'name' is not null and company_data->>'name' <> '' then
    insert into public.companies(name, nip, address, city, voivodeship, website)
    values (
      company_data->>'name',
      company_data->>'nip',
      company_data->>'address',
      company_data->>'city',
      company_data->>'voivodeship',
      company_data->>'website'
    )
    returning id into new_company_id;
  end if;

  insert into public.contacts(
    first_name,
    last_name,
    phone,
    email,
    type,
    source,
    last_activity_date,
    company_id
  )
  values (
    contact_data->>'first_name',
    contact_data->>'last_name',
    contact_data->>'phone',
    contact_data->>'email',
    contact_data->>'type',
    contact_data->>'source',
    (contact_data->>'last_activity_date')::date,
    new_company_id
  )
  returning id into new_contact_id;

  return new_contact_id;
end;
$$;

