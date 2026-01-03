
# Ritual Grimoire

A dark, occult-themed knowledge trial for the Ritual community.

## Visual Identity
- **Palette**: Black (#000000), Neon Green (#39FF14), White (#FFFFFF)
- **Fonts**: Cinzel Decorative (Headings), Inter (Body)
- **Theme**: Ritualistic, Modern Dark Grimoire
- **Background**: Ritual logo spinning slowly at 5% opacity.
- **Footer**: Custom attribution to `aliorbz` with a stylized hover effect.

## Supabase Setup Guide

To get the leaderboard working, follow these exact steps in your Supabase Dashboard:

1. **Create Table**:
   Go to the SQL Editor and run this command:
   ```sql
   create table public.attempts (
     id uuid default gen_random_uuid() primary key,
     session_id text not null,
     display_name text not null,
     topic_id text not null,
     score int2 not null,
     total_questions int2 not null,
     time_taken_seconds int4 not null,
     created_at timestamp with time zone default now()
   );

   -- Allow public access (Read/Insert) for this demo
   alter table public.attempts enable row level security;
   create policy "Enable all for anyone" on public.attempts for all using (true);
   ```

2. **Leaderboard Logic**:
   The app calculates total scores by taking the highest score a user has achieved for *each* unique topic and summing them. 
   Retaking a quiz only increases the total score if the new score exceeds the previous best for that specific topic.

3. **Env Vars**:
   - `SUPABASE_URL`: Found in Project Settings -> API.
   - `SUPABASE_ANON_KEY`: Found in Project Settings -> API.

## Content
- **Topic 1**: "What is Ritual?" (15 Questions)
- **Topic 2**: "EVM++" (Locked)
- **Topic 3**: "Execution Sidecars" (Locked)

## Credits
EVOKED FROM THE VOID BY **aliorbz**
