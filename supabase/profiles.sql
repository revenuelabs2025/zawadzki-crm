-- Enable Auth module via Supabase dashboard or CLI before running this script.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);
