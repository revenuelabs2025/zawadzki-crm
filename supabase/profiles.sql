-- Enable Auth module via Supabase dashboard or CLI before running this script.

create table if not exists profiles (
  id serial primary key,
  full_name text,
  login text unique not null,
  pass text not null,
  created_at timestamptz default now()
);
