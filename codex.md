# YLO Music Page (Single Page) - Codex Plan & Spec

## 0) Goal (Non-Negotiable)
Build a single-page website for publishing and streaming YLO tracks.
- One page only (Home). No additional pages required.
- Tracks must be playable directly on the page via an internal player (single `HTMLAudioElement`).
- No cover art needed. Design relies on typography and layout.
- Branding:
  - Artist: YLO
  - Tagline: "Everything, you express"
- Languages (UI): EN / DE only (simple UI text switching, not full CMS).

Deployment target: Vercel.

## 1) Scope Boundaries (Hard Constraints)
- No external analytics / trackers.
- No third-party embeds (Spotify/YouTube/SoundCloud) for playback; use a native player.
- No legal pages (impressum/datenschutz) for this small project. Do not add legal/cookie banners.
- No authentication, no database, no backend. Local content only (static data file).

## 2) Design Direction (Variant A - Editorial Minimal)
Design principles:
- Dark-first, minimal, editorial typography.
- Centered composition, lots of whitespace.
- Tracklist-first layout; no cards grid.
- Subtle background gradients + optional grain texture.
- Subtle hover/active states, no heavy neon, no clutter.

Visual sections:
1. Topbar: language switch only (EN/DE) on the top-right. No top-left brand/logo block.
2. Hero: large centered "YLO" and tagline.
3. Center header: "TRACKS" label + thin vertical line.
4. Tracklist block with:
   - header: "YEAR - N TRACKS" + small hint (e.g., "Click to play")
   - rows: index, title, small meta, duration
   - active row highlight (soft gradient)
5. Lyrics area under tracklist (conditional).
6. Bottom fixed player bar (conditional visibility):
   - Now playing
   - Prev / Play-Pause / Next icon controls
   - Time elapsed, scrubber, total duration
   - Volume control

## 3) Information Architecture (Components)
Required components:
- `<Background />`: fixed background layers/image with playback-reactive visual state.
- `<Topbar />`: language selector only (EN/DE), top-right.
- `<HeroBrand />`: centered brand title/tagline.
- `<TrackList />`: list of tracks, highlights active, onClick sets track+play.
- `<LyricsPanel />`: shows selected track lyrics when available.
- `<PlayerBar />`: fixed bottom, controls, progress scrubber, volume.

State management:
- Use a simple central store with a single `HTMLAudioElement`.
- Store state includes:
  - `currentIndex: number | null`
  - `isPlaying: boolean`
  - `currentTime: number`
  - `duration: number`
  - `hasEverPlayed: boolean`
  - `volume: number`
- Store actions include:
  - `setTrack(index, autoplay=true)`
  - `play(), pause(), toggle()`
  - `next(), prev()`
  - `seek(seconds)`
  - `setVolume(value)`

Playback behavior:
- `setTrack` is the only place that loads/reloads source and resets time state.
- `play()` resumes from current time; pause/resume must not restart the same track.
- If `audio.play()` is rejected, fail gracefully and do not crash.

PlayerBar visibility behavior:
- Completely hidden on initial load.
- Becomes visible only after the first successful playback start (`audio.play()` resolves).
- After appearing, stays visible for the session even when paused.

Accessibility:
- Buttons need `aria-label`.
- Focus styles visible.
- Reduced motion support where relevant.

## 4) Content Model
Tracks are defined in:
- `/src/lib/tracks.ts`

Type:
- `id: string` (slug-like, stable identifier)
- `title: string` (display title)
- `year: number` (e.g., 2026)
- `src: string` (audio URL)
- `duration?: string`
- `tags?: string`
- `lyrics?: string` (single language-independent string)

Lyrics behavior:
- Lyrics are shown under tracks for the selected track.
- If no track selected, show nothing (no panel).
- If selected track has no lyrics, show nothing (no panel).
- Preserve line breaks.

## 5) Audio Hosting (Current Approach)
- MP3 files are stored locally under `/public/audio`.
- Track `src` values use `"/audio/<file>.mp3"` paths.
- Filenames must be slug-like.
- Strict rule: do not use spaces or commas in audio filenames.

## 6) Tech Stack & Repo Structure
- Next.js (App Router) + TypeScript + Tailwind
- No backend.

Suggested structure:
- `/src/app`
  - `layout.tsx`
  - `page.tsx`
- `/src/components`
  - `Background.tsx`
  - `Topbar.tsx`
  - `HeroBrand.tsx`
  - `TrackList.tsx`
  - `LyricsPanel.tsx`
  - `PlayerBar.tsx`
  - `PageShell.tsx`
- `/src/lib`
  - `tracks.ts`
  - `playerStore.ts`
  - `i18n.ts`
  - `time.ts`
- `/public/audio`
  - local `.mp3` files
- `/src/styles`
  - `globals.css`

## 7) Current Controls/UX (Implemented)
- Prev / Play-Pause / Next are icon buttons (inline SVG), accessible and keyboard-focusable.
- Volume control slider is available in `PlayerBar`.
- Play/Pause resumes from paused `currentTime` instead of restarting.
- Active track selection updates row highlight and now-playing title.

## 8) Milestones (Execution Plan)
Milestone 1 - UI Skeleton (MVP): DONE
- Next.js + Tailwind scaffold
- Core layout/components
- EN/DE language selector

Milestone 2 - Real Playback: DONE
- Single shared audio element in central store
- Track selection + playback wiring
- Play/pause/next/prev + progress/scrubbing + metadata time updates
- Ended -> next track behavior
- Local `/public/audio` source wiring

Milestone 3 - Polish (optional remaining)
- Keyboard shortcuts
- Prefers-reduced-motion refinements
- Mobile safe-area / tap target refinement
- Basic SEO + deploy checklist

Current status:
- Single-page player is implemented and functional.
- EN/DE UI mode is active.
- Local audio playback from `/public/audio` is supported.
- Conditional lyrics rendering is implemented.
- PlayerBar visibility is gated by first successful playback.

Definition of Done:
- On Vercel, user can open the home page, click a track, hear audio, control with bar, scrub, and adjust volume.

## 9) Rules for Codex Collaboration
Before starting ANY task:
1. Read this file fully.
2. Do not expand scope.
3. If new constraints appear, propose a minimal change and update this file accordingly.
4. If this file conflicts with current implemented behavior, update `codex.md` first before changing code.

When implementing:
- Prefer small, clean components.
- Avoid overengineering.
- Keep UI consistent with Variant A.
