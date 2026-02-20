'use client'

import { tracks } from '@/data/tracks'
import TrackCard from '@/components/TrackCard'
import StickyPlayer from '@/components/StickyPlayer'
import useAudioPlayer from '@/hooks/useAudioPlayer'

const BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL ?? ''

if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_R2_BASE_URL) {
  console.warn('YLO: NEXT_PUBLIC_R2_BASE_URL is not set')
}

export default function Home() {
  const { currentTrackId, isPlaying, progress, play, pause, resume, seek, next, prev } =
    useAudioPlayer()

  const currentTrack = tracks.find((t) => t.id === currentTrackId) ?? null

  const handlePlayPause = () => {
    if (isPlaying) pause()
    else resume()
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(80px, 12vw, 160px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1,
          }}
        >
          YLO
        </h1>
        <p
          style={{
            color: '#888888',
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: 24,
          }}
        >
          Music. Nothing else.
        </p>
      </section>

      {/* Tracklist */}
      <section
        style={{
          paddingTop: 80,
          maxWidth: 720,
          margin: '0 auto',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.3em',
            color: '#888888',
            textTransform: 'uppercase',
            marginBottom: 24,
            marginTop: 0,
          }}
        >
          Tracks
        </p>

        {tracks.map((track) => {
          const src = `${BASE_URL}/${track.filename}`
          return (
            <TrackCard
              key={track.id}
              track={track}
              isActive={currentTrackId === track.id}
              isPlaying={isPlaying}
              onClick={() => play(track.id, src)}
            />
          )
        })}
      </section>

      {/* Sticky player */}
      <StickyPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        onPlayPause={handlePlayPause}
        onNext={() => next(tracks)}
        onPrev={() => prev(tracks)}
        onSeek={seek}
      />
    </div>
  )
}
