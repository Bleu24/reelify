-- Reelify: TikTok OAuth persistence
--
-- Creates:
-- - public.tiktok_accounts (profile + settings)
-- - public.tiktok_tokens (write-only tokens)
--
-- Notes:
-- - Designed for Supabase Postgres.
-- - RLS is enabled. Accounts are readable by their owner; tokens are write-only.

create extension if not exists pgcrypto;

-- Accounts (profile/settings)
create table if not exists public.tiktok_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,

  tiktok_open_id text not null,

  handle text not null,
  display_name text not null,
  avatar_url text,

  status text not null check (status in ('active', 'paused', 'draft')),
  safety_mode text not null check (safety_mode in ('publish', 'draft')),
  niche text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, tiktok_open_id)
);

create index if not exists tiktok_accounts_user_id_idx on public.tiktok_accounts (user_id);

-- Tokens (write-only)
create table if not exists public.tiktok_tokens (
  tiktok_account_id uuid primary key references public.tiktok_accounts (id) on delete cascade,

  access_token text not null,
  refresh_token text,
  scope text,
  expires_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated-at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_tiktok_accounts on public.tiktok_accounts;
create trigger set_updated_at_tiktok_accounts
before update on public.tiktok_accounts
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_tiktok_tokens on public.tiktok_tokens;
create trigger set_updated_at_tiktok_tokens
before update on public.tiktok_tokens
for each row
execute function public.set_updated_at();

-- RLS
alter table public.tiktok_accounts enable row level security;
alter table public.tiktok_tokens enable row level security;

-- Accounts: owner can CRUD
-- Select
drop policy if exists "tiktok_accounts_select_own" on public.tiktok_accounts;
create policy "tiktok_accounts_select_own"
  on public.tiktok_accounts
  for select
  to authenticated
  using (user_id = auth.uid());

-- Insert
drop policy if exists "tiktok_accounts_insert_own" on public.tiktok_accounts;
create policy "tiktok_accounts_insert_own"
  on public.tiktok_accounts
  for insert
  to authenticated
  with check (user_id = auth.uid());

-- Update
drop policy if exists "tiktok_accounts_update_own" on public.tiktok_accounts;
create policy "tiktok_accounts_update_own"
  on public.tiktok_accounts
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Delete
drop policy if exists "tiktok_accounts_delete_own" on public.tiktok_accounts;
create policy "tiktok_accounts_delete_own"
  on public.tiktok_accounts
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Tokens: write-only for account owner (no SELECT policy)
-- Insert
drop policy if exists "tiktok_tokens_insert_own" on public.tiktok_tokens;
create policy "tiktok_tokens_insert_own"
  on public.tiktok_tokens
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.tiktok_accounts a
      where a.id = tiktok_account_id
        and a.user_id = auth.uid()
    )
  );

-- Update
drop policy if exists "tiktok_tokens_update_own" on public.tiktok_tokens;
create policy "tiktok_tokens_update_own"
  on public.tiktok_tokens
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.tiktok_accounts a
      where a.id = tiktok_account_id
        and a.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.tiktok_accounts a
      where a.id = tiktok_account_id
        and a.user_id = auth.uid()
    )
  );
