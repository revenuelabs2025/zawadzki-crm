create table if not exists notes (
  id uuid primary key,
  entity_type text,
  entity_id uuid,
  user_id integer references profiles(id),
  content text,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key,
  entity_type text,
  entity_id uuid,
  direction text,
  user_id integer references profiles(id),
  subject text,
  body text,
  sent_at timestamptz,
  status text
);

