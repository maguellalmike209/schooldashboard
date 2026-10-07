begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(40);

-- These are placeholder Auth rows for FK tests. They cannot sign in.
insert into auth.users (id, email) values
  ('11111111-1111-4111-8111-111111111111', 'sd015-a@example.invalid'),
  ('22222222-2222-4222-8222-222222222222', 'sd015-b@example.invalid');

insert into public.academic_terms (id, owner_id, name) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'A Term'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 'B Term');
insert into public.courses (id, owner_id, term_id, code, name) values
  ('aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'A101', 'A Course'),
  ('bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'B101', 'B Course');

select ok((select relrowsecurity from pg_class where oid = 'public.academic_terms'::regclass), 'term RLS enabled');
select ok((select relrowsecurity from pg_class where oid = 'public.courses'::regclass), 'course RLS enabled');
select is((select count(*) from pg_policies where schemaname = 'public' and tablename = 'academic_terms'), 4::bigint, 'four term policies');
select is((select count(*) from pg_policies where schemaname = 'public' and tablename = 'courses'), 4::bigint, 'four course policies');

set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok('select * from public.academic_terms', '42501');
select throws_ok('select * from public.courses', '42501');
select throws_ok($$insert into public.academic_terms(owner_id,name) values('11111111-1111-4111-8111-111111111111','anon')$$, '42501');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','X','anon')$$, '42501');
select throws_ok($$update public.academic_terms set name='anon'$$, '42501');
select throws_ok($$update public.courses set name='anon'$$, '42501');
select throws_ok($$delete from public.academic_terms$$, '42501');
select throws_ok($$delete from public.courses$$, '42501');

set local role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', true);
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"11111111-1111-4111-8111-111111111111"}', true);
select results_eq('select count(*) from public.academic_terms', array[1::bigint], 'A sees only A term');
select results_eq('select count(*) from public.courses', array[1::bigint], 'A sees only A course');
select results_eq($$select count(*) from public.courses where id='bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb'$$, array[0::bigint], 'A direct B course read denied');
select results_eq($$update public.courses set name='A Updated' where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa' returning name$$, array['A Updated'], 'A updates own course');
select is((select name from public.courses where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa'), 'A Updated', 'own course update persisted');
select is_empty($$update public.courses set name='Stolen' where id='bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb' returning id$$, 'A cannot update B course');
select is_empty($$delete from public.courses where id='bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb' returning id$$, 'A cannot delete B course');
select throws_ok($$insert into public.academic_terms(owner_id,name) values('22222222-2222-4222-8222-222222222222','Spoof')$$, '42501');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('22222222-2222-4222-8222-222222222222','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','SP','Spoof')$$, '42501');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','X','Cross term')$$, '23503');
select throws_ok($$update public.courses set owner_id='22222222-2222-4222-8222-222222222222' where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa'$$, '42501');
select throws_ok($$update public.courses set term_id='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa'$$, '23503');
select throws_ok($$update public.academic_terms set owner_id='22222222-2222-4222-8222-222222222222' where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'$$, '42501');
select results_eq($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','A102','Second A course') returning code$$, array['A102'], 'A creates own course');
select results_eq($$delete from public.courses where code='A102' returning code$$, array['A102'], 'A deletes own course');
select results_eq($$select count(*) from public.courses where code='A102'$$, array[0::bigint], 'own course deletion persisted');
select throws_ok($$insert into public.academic_terms(owner_id,name) values('11111111-1111-4111-8111-111111111111','')$$, '23514');
select throws_ok($$insert into public.academic_terms(owner_id,name) values('11111111-1111-4111-8111-111111111111',repeat('x',81))$$, '23514');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','','Invalid')$$, '23514');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','LONG',repeat('x',121))$$, '23514');
select throws_ok($$insert into public.courses(owner_id,term_id,code,name) values('11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','A101','Duplicate')$$, '23505');

set local role authenticated;
select set_config('request.jwt.claim.sub', '22222222-2222-4222-8222-222222222222', true);
select set_config('request.jwt.claims', '{"role":"authenticated","sub":"22222222-2222-4222-8222-222222222222"}', true);
select results_eq('select count(*) from public.academic_terms', array[1::bigint], 'B sees only B term');
select results_eq('select count(*) from public.courses', array[1::bigint], 'B sees only B course');
select results_eq($$select count(*) from public.courses where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa'$$, array[0::bigint], 'B direct A course read denied');
select is_empty($$update public.courses set name='Stolen' where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa' returning id$$, 'B cannot update A course');
select is_empty($$delete from public.courses where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa' returning id$$, 'B cannot delete A course');

reset role;
select is((select name from public.courses where id='bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb'), 'B Course', 'B course unchanged by A');
select is((select name from public.courses where id='aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa'), 'A Updated', 'A course unchanged by B');

select * from finish();
rollback;
