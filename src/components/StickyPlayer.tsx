'use client'

import { useRef, useState } from 'react'
import { Track } from '@/data/tracks'
import CoverArt from '@/components/CoverArt'
import { PrevIcon, NextIcon, PlayIcon, PauseIcon } from '@/components/PlayerIcons'

interface StickyPlayerProps {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  onPlayPause: () => void
  onNext: () => void
  onPrev: () => void
  onSeek: (percent: number) => void
}

function ControlButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        color: hovered ? '#F5C400' : 'white',
        transition: 'color 150ms ease',
      }}
    >
      {/* clone children with color prop via wrapper */}
      <span style={{ color: 'inherit', display: 'flex' }}>
        {hovered
          ? (() => {
              const child = children as React.ReactElement<{ color?: string }>
              return { ...child, props: { ...child.props, color: '#F5C400' } }
            })()
          : children}
      </span>
    </button>
  )
}

export default function StickyPlayer({
  currentTrack,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
}: StickyPlayerProps) {
  const progressBarRef = useRef<HTMLDivElement>(null)

  if (!currentTrack) return null

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const percent = ((e.clientX - rect.left) / rect.width) * 100
    onSeek(Math.max(0, Math.min(100, percent)))
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        background: '#0A0A0A',
        borderTop: '1px solid #1f1f1f',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        onClick={handleProgressClick}
        style={{
          width: '100%',
          height: 2,
          background: '#1f1f1f',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <div style={{ width: `${progress}%`, height: '100%', background: '#F5C400' }} />
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 16px' }}>
        {/* Left — track info */}
        <div style={{ width: '25%', display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ flexShrink: 0 }}>
            <CoverArt title={currentTrack.title} size={40} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {currentTrack.title}
            </div>
            <div style={{ color: '#888888', fontSize: 11 }}>YLO</div>
          </div>
        </div>

        {/* Center — controls */}
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <ControlButton onClick={onPrev}><PrevIcon /></ControlButton>
          <ControlButton onClick={onPlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>
          <ControlButton onClick={onNext}><NextIcon /></ControlButton>
        </div>

        {/* Right — reserved */}
        <div style={{ width: '25%' }} />
      </div>
    </div>
  )
}
