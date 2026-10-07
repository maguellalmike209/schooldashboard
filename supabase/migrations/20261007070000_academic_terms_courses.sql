-- SD-015: the only private academic tables in the initial authenticated slice.
create table public.academic_terms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  name text not null,
  constraint academic_terms_name_bounds check (
    name = btrim(name) and char_length(name) between 1 and 80
  ),
  constraint academic_terms_owner_name_unique unique (owner_id, name),
  constraint academic_terms_id_owner_unique unique (id, owner_id)
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  term_id uuid not null,
  code text not null,
  name text not null,
  constraint courses_code_bounds check (
    code = btrim(code) and char_length(code) between 1 and 24
  ),
  constraint courses_name_bounds check (
    name = btrim(name) and char_length(name) between 1 and 120
  ),
  constraint courses_term_same_owner foreign key (term_id, owner_id)
    references public.academic_terms(id, owner_id) on delete restrict,
  constraint courses_owner_term_code_unique unique (owner_id, term_id, code)
);

create index courses_owner_term_idx on public.courses(owner_id, term_id);

alter table public.academic_terms enable row level security;
alter table public.courses enable row level security;

revoke all on table public.academic_terms, public.courses from public, anon, authenticated;
grant select, insert, update, delete on table public.academic_terms, public.courses to authenticated;

create policy academic_terms_select_owner on public.academic_terms
  for select to authenticated using ((select auth.uid()) = owner_id);
create policy academic_terms_insert_owner on public.academic_terms
  for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy academic_terms_update_owner on public.academic_terms
  for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
create policy academic_terms_delete_owner on public.academic_terms
  for delete to authenticated using ((select auth.uid()) = owner_id);

create policy courses_select_owner on public.courses
  for select to authenticated using ((select auth.uid()) = owner_id);
create policy courses_insert_owner on public.courses
  for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy courses_update_owner on public.courses
  for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
create policy courses_delete_owner on public.courses
  for delete to authenticated using ((select auth.uid()) = owner_id);
