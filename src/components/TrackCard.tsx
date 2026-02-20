'use client'

import { useState } from 'react'
import { Track } from '@/data/tracks'
import CoverArt from '@/components/CoverArt'
import styles from './TrackCard.module.css'

interface TrackCardProps {
  track: Track
  isActive: boolean
  isPlaying: boolean
  onClick: () => void
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,3 17,10 5,17" />
    </svg>
  )
}

function Equalizer() {
  const barBase: React.CSSProperties = {
    width: 3,
    background: '#F5C400',
    borderRadius: 1,
    alignSelf: 'flex-end',
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 16 }}>
      <div style={barBase} className={styles.bar1} />
      <div style={barBase} className={styles.bar2} />
      <div style={barBase} className={styles.bar3} />
    </div>
  )
}

export default function TrackCard({ track, isActive, isPlaying, onClick }: TrackCardProps) {
  const [hovered, setHovered] = useState(false)

  const showOverlay = hovered || isActive

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: hovered ? '#141414' : 'transparent',
        borderLeft: isActive ? '2px solid #F5C400' : '2px solid transparent',
        cursor: 'pointer',
        transition: 'background 150ms ease',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Cover art with play overlay */}
      <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
        <CoverArt title={track.title} size={56} />
        {showOverlay && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
            }}
          >
            <PlayIcon />
          </div>
        )}
      </div>

      {/* Track info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {track.title}
        </div>
        <div style={{ color: '#888888', fontSize: 12, marginTop: 2 }}>
          {track.duration ?? ''}
        </div>
      </div>

      {/* Equalizer */}
      <div style={{ width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {isActive && isPlaying && <Equalizer />}
      </div>
    </div>
  )
}
