create table if not exists files (
  id uuid primary key,
  entity_type text,
  entity_id uuid,
  file_name text,
  file_url text,
  uploaded_by integer references profiles(id),
  uploaded_at timestamptz default now()
);
