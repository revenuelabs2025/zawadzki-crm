-- Enable Auth module via Supabase dashboard or CLI before running this script.

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text
);
