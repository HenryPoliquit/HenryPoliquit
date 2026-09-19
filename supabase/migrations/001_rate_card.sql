-- ─────────────────────────────────────────────────────────────────────────
-- 001_rate_card.sql
--
-- Adds the case-study fields the "Rate Card" redesign needs, and rewrites the
-- profile + project copy.
--
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent.
--
-- Rows are matched by `title` rather than `id`, so this works whether the live
-- `projects.id` is an integer or a uuid.
-- ─────────────────────────────────────────────────────────────────────────

-- ── Schema ───────────────────────────────────────────────────────────────

alter table public.projects
  add column if not exists tier    text not null default 'foundation',
  add column if not exists tagline text,
  add column if not exists market  text,
  add column if not exists since   text,
  add column if not exists problem text,
  add column if not exists build   text,
  add column if not exists runs_on text,
  add column if not exists caveat  text;

comment on column public.projects.tier is
  'production | foundation — drives which band the project renders in';
comment on column public.projects.tagline is
  'One line. Shown in the rate row and the foundations list.';
comment on column public.projects.caveat is
  'The honest footnote. Rendered as small print under the band.';

alter table public.profile
  add column if not exists tagline text;

comment on column public.profile.tagline is
  'The thesis line under the name on the home page. Keep it to two sentences.';

-- ── Profile copy ─────────────────────────────────────────────────────────

update public.profile set
  title    = 'Full-stack developer',
  tagline  = 'I build web applications and run them. One of them takes payments in Singapore.',
  location = 'Bacong, Negros Oriental',
  bio      = 'I''m a full-stack developer in Bacong, Negros Oriental. I build web '
             'applications and then run them. Right now that means CompareIP.sg — a '
             'premium-comparison tool for Singapore''s Integrated Shield Plan market — '
             'which I keep alive on Cloud Run and Cloud SQL from about 2,400 km away. '
             'I learned Java and Spring in coursework at Lithan EduClaaS. I learned '
             'everything else by having something in production.';

-- ── The production tier ──────────────────────────────────────────────────

update public.projects set
  tier    = 'production',
  market  = 'Singapore',
  since   = '2025',
  tagline = 'Premium comparison for Singapore''s Integrated Shield Plan market.',

  problem = 'Comparing Integrated Shield Plan premiums in Singapore means opening a '
            'PDF from every insurer and reading rate tables side by side. The numbers '
            'are public; putting them next to each other is the work. Financial agents '
            'do it by hand, for every client.',

  build   = 'A comparison tool that holds every insurer''s premium table in one schema, '
            'so a plan becomes a query instead of a PDF. Consumers get plan comparison, '
            'premium mapping against their age band, and a saved profile. Financial '
            'agents get a subscription tier, billed through HitPay, that opens up the '
            'client-facing views.',

  runs_on = 'Vue 3 and Vuetify on the front. Fastify on Cloud Run behind GCP API '
            'Gateway, with Cloud SQL Postgres holding the premium data and Firebase '
            'handling auth.',

  -- TODO(paul): replace with the real story. This is a draft.
  caveat  = 'Insurers revise their premium tables and nothing warns you. The hard part '
            'of this project was never the interface — it was keeping the data honest. '
            'That is still where most of the work goes.'
where title = 'CompareIP.sg';

-- ── The foundation tier ──────────────────────────────────────────────────

update public.projects set
  tier   = 'foundation',
  caveat = 'Coursework, built to a brief at Lithan EduClaaS.'
where title <> 'CompareIP.sg';

update public.projects set
  tagline = 'Ordering system for a charity that delivers hot meals to people who cannot cook for themselves.'
where title = 'Meals on Wheels';

update public.projects set
  tagline = 'Directory of neighbourhood stores. React front end over a custom REST API.'
where title = 'Know Your Neighborhood';

update public.projects set
  tagline = 'Job board with accounts, profiles, and admin user management.'
where title = 'ABC Job Portal';

update public.projects set
  tagline = 'Used-car listings with test-drive bookings and a bid-approval flow.'
where title = 'ABC Car Portal';

-- ── Sanity check ─────────────────────────────────────────────────────────
-- Expect exactly one 'production' row and four 'foundation' rows.

select tier, count(*) from public.projects group by tier order by tier;
