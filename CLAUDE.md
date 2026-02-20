# YLO — Music Streaming Site
## Project Overview
Personal music streaming one-pager for artist "YLO".
Dark/minimalist aesthetic. Self-hosted MP3s via Cloudflare R2.
## Tech Stack
- Next.js 14, App Router, TypeScript
- Tailwind CSS
- wavesurfer.js (audio player with waveform)
- Cloudflare R2 (MP3 hosting)
- Vercel (deployment)
## Color System
- Background: #0A0A0A
- Accent: #F5C400 (YLO Yellow — use sparingly, single signal color)
- Surface: #141414
- Muted text: #888888
- Text: #FFFFFF
## Typography
- Font: Space Grotesk (Google Fonts)
- Hero: clamp(80px, 12vw, 160px), bold
- Section headers: small caps, muted, 12px tracking
- Body: 14-16px
## Design Principles
1. One accent color only — #F5C400. Never add other colors.
2. No gradients except in generative CoverArt component.
3. Mobile-first. Test all components at 375px width first.
4. Animations: subtle only. Max 300ms transitions.
5. No external icon libraries. Inline SVG only.
## Page Structure (One-Pager)
1. Hero — "YLO" large, centered, tagline "Music. Nothing else."
2. Tracklist — all 11 tracks with TrackCard components
3. StickyPlayer — persistent bottom bar, 72px height
## Component Map
- /src/components/CoverArt.tsx — generative canvas cover per track
- /src/components/TrackCard.tsx — single track row
- /src/components/StickyPlayer.tsx — sticky bottom player
- /src/hooks/useAudioPlayer.ts — global audio state
- /src/data/tracks.ts — track data array
## Audio
- MP3s served from Cloudflare R2
- Base URL via env: NEXT_PUBLIC_R2_BASE_URL
- Full URL pattern: ${NEXT_PUBLIC_R2_BASE_URL}/${track.filename}
- Do NOT use wavesurfer.js for mobile (performance). Fall back to native HTML Audio API on mobile.
## Environment Variables
NEXT_PUBLIC_R2_BASE_URL=https://your-r2-domain.com
## Track List (exact filenames)
1. Chase_the_Light.mp3
2. Mode_Change.mp3
3. My_Bassline.mp3
4. No_Face__No_Access.mp3
5. One_More_Time.mp3
6. RUN_IT_UP.mp3
7. Say_It.mp3
8. Still_On.mp3
9. Sunday_Loop.mp3
10. Where_Were_You_Then_.mp3
11. 같은_밤을_걷는_법__WE_ALL_DO_.mp3
## Rules for Claude Code
- Always check CLAUDE.md before starting any task
- Never install external icon libraries
- Never add colors outside the defined color system
- Always handle loading and error states in components
- Keep components under 150 lines — split if larger
- After every component: verify it renders without TypeScript errors
