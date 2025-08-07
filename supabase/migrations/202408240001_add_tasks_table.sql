create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text,
  assigned_user_id uuid references profiles(id),
  due_date date,
  completed boolean default false,
  contact_id uuid,
  offer_id uuid
);

create index tasks_due_date_idx on tasks (due_date);
create index tasks_assigned_user_id_idx on tasks (assigned_user_id);
