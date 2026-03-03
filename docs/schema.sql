-- Supabase schema for GENESIS extensions (user profiles, settings, items, tags, reminders)

-- Enable pgvector if needed:
-- create extension if not exists vector;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  x_user_id text unique,
  display_name text,
  avatar_url text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Items (ingested content)
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references public.profiles(id) on delete cascade,
  source text not null, -- 'x', 'manual', 'share', etc.
  title text,
  content text,
  media jsonb, -- array of media objects
  raw jsonb, -- raw payload
  summary text,
  tags_ai text[] default '{}',
  embedding vector(1536),
  created_at timestamp with time zone default now(),
  indexed_at timestamp with time zone
);

-- Tags
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  color text,
  icon text,
  unique(owner, name)
);

-- Item ↔ Tag
create table if not exists public.item_tags (
  item uuid references public.items(id) on delete cascade,
  tag uuid references public.tags(id) on delete cascade,
  primary key (item, tag)
);

-- Reminders
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references public.profiles(id) on delete cascade,
  item uuid references public.items(id) on delete set null,
  title text not null,
  due_at timestamp with time zone,
  recurring jsonb,
  created_at timestamp with time zone default now()
);

-- Suggested indexes
create index if not exists items_owner_idx on public.items(owner);
create index if not exists items_embedding_idx on public.items using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index if not exists items_created_idx on public.items(created_at);
create index if not exists tags_owner_idx on public.tags(owner);

-- RLS
alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.tags enable row level security;
alter table public.item_tags enable row level security;
alter table public.reminders enable row level security;

create policy "profiles owner" on public.profiles
  using (id = auth.uid()) with check (id = auth.uid());

create policy "items owner" on public.items
  using (owner = auth.uid()) with check (owner = auth.uid());

create policy "tags owner" on public.tags
  using (owner = auth.uid()) with check (owner = auth.uid());

create policy "item_tags owner" on public.item_tags
  using (exists (select 1 from public.items i where i.id = item and i.owner = auth.uid()))
  with check (exists (select 1 from public.items i where i.id = item and i.owner = auth.uid()));

create policy "reminders owner" on public.reminders
  using (owner = auth.uid()) with check (owner = auth.uid());

