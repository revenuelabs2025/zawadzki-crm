create table if not exists notes (
  id uuid primary key,
  entity_type text,
  entity_id uuid,
  user_id uuid references profiles(id),
  content text,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key,
  entity_type text,
  entity_id uuid,
  direction text,
  user_id uuid references profiles(id),
  subject text,
  body text,
  sent_at timestamptz,
  status text
);

alter table messages enable row level security;

create policy "Users can view related messages" on messages
for select
using (
  auth.uid() = user_id
  or exists (
    select 1 from profiles p
    where p.id = auth.uid()
      and (
        (messages.entity_type = 'company' and messages.entity_id = p.company_id) or
        (messages.entity_type = 'project' and messages.entity_id = p.project_id)
      )
  )
);

create policy "Users can insert own messages" on messages
for insert
with check (auth.uid() = user_id);
