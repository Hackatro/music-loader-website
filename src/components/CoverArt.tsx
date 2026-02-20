'use client'

import { useEffect, useRef } from 'react'

interface CoverArtProps {
  title: string
  size?: number
}

function hashTitle(title: string): number {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash += title.charCodeAt(i)
  }
  return hash
}

function drawDiagonalStripes(
  ctx: CanvasRenderingContext2D,
  size: number,
  bg: string,
  fg: string,
  angle: number,
) {
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  ctx.save()
  ctx.translate(size / 2, size / 2)
  ctx.rotate((angle * Math.PI) / 180)

  ctx.strokeStyle = fg
  ctx.lineWidth = size * 0.06
  const step = size * 0.14
  const extent = size * 1.5

  for (let x = -extent; x <= extent; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, -extent)
    ctx.lineTo(x, extent)
    ctx.stroke()
  }

  ctx.restore()
}

function drawConcentricSquares(
  ctx: CanvasRenderingContext2D,
  size: number,
  bg: string,
  fg: string,
) {
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  const steps = 6
  const step = size / (steps * 2)

  for (let i = steps; i >= 0; i--) {
    const inset = (steps - i) * step
    const s = size - inset * 2
    ctx.strokeStyle = i % 2 === 0 ? fg : bg
    ctx.lineWidth = step * 0.6
    ctx.strokeRect(inset + step * 0.3, inset + step * 0.3, s - step * 0.6, s - step * 0.6)
  }
}

function drawRadialBurst(
  ctx: CanvasRenderingContext2D,
  size: number,
  bg: string,
  fg: string,
  angle: number,
) {
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  const cx = size / 2
  const cy = size / 2
  const rays = 12
  const outerR = size * 0.72
  const innerR = size * 0.08

  for (let i = 0; i < rays; i++) {
    const a0 = (i / rays) * Math.PI * 2 + (angle * Math.PI) / 180
    const a1 = ((i + 0.5) / rays) * Math.PI * 2 + (angle * Math.PI) / 180

    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a0) * innerR, cy + Math.sin(a0) * innerR)
    ctx.lineTo(cx + Math.cos(a0) * outerR, cy + Math.sin(a0) * outerR)
    ctx.lineTo(cx + Math.cos(a1) * outerR, cy + Math.sin(a1) * outerR)
    ctx.lineTo(cx + Math.cos(a1) * innerR, cy + Math.sin(a1) * innerR)
    ctx.closePath()

    ctx.fillStyle = i % 2 === 0 ? fg : bg
    ctx.fill()
  }
}

export default function CoverArt({ title, size = 200 }: CoverArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const hash = hashTitle(title)
    const angle = hash % 360
    const colorIndex = hash % 4
    const patternIndex = hash % 3

    const darkColors = ['#1a1a2e', '#16213e', '#0f3460', '#1b1b2f']
    const bg = darkColors[colorIndex]
    const fg = '#F5C400'

    if (patternIndex === 0) {
      drawDiagonalStripes(ctx, size, bg, fg, angle)
    } else if (patternIndex === 1) {
      drawConcentricSquares(ctx, size, bg, fg)
    } else {
      drawRadialBurst(ctx, size, bg, fg, angle)
    }
  }, [title, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size }}
    />
  )
}
