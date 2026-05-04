# Reelify (MVP prototype)

Mock-only Next.js dashboard for automating short-form TikTok content creation & publishing.

## Local development

1. Install dependencies:

```sh
npm install
```

2. Configure environment variables:

- Copy `.env.example` → `.env.local`
- Fill in the values from your Supabase project settings

3. Run the dev server:

```sh
npm run dev
```

Then open `http://localhost:3000`.

## Supabase

This repo includes Supabase setup in `lib/supabase/` (client factories + env helpers).

The app now initializes an **anonymous Supabase session** automatically (no login UI) so you can enable RLS policies and associate connected TikTok accounts with `auth.uid()`.

## TikTok OAuth (Login Kit)

OAuth routes:
- `GET /auth/tiktok` starts the Login Kit authorization flow
- `GET /auth/tiktok/callback` exchanges `code` for tokens and stores the connected account in Supabase

Required env vars (see `.env.example`):
- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET`
- `TIKTOK_REDIRECT_URI`

You must also register the redirect URI in your TikTok Developer app settings.

Important: this implementation uses TikTok Open API calls (token exchange + user info) and requires your TikTok app credentials.

## Project rules (important)

- App Router only (`app/`), no `pages/`.
- Mock data only (no external API calls). All mock data lives in `lib/mockData.ts`.
- Types live in `lib/types.ts`.
- Tailwind CSS for all styling.
- shadcn/ui-style components live in `components/ui/`.
- lucide-react for icons.
