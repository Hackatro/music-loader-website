import { useRef, useState, useCallback, useEffect } from 'react'
import { Track } from '@/data/tracks'

interface AudioPlayerState {
  currentTrackId: string | null
  isPlaying: boolean
  progress: number
  duration: number
}

interface AudioPlayerActions {
  play: (trackId: string, src: string) => void
  pause: () => void
  resume: () => void
  seek: (percent: number) => void
  next: (tracks: Track[]) => void
  prev: (tracks: Track[]) => void
}

export type UseAudioPlayerReturn = AudioPlayerState & AudioPlayerActions

export default function useAudioPlayer(): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSrcRef = useRef<string | null>(null)
  const tracksRef = useRef<Track[]>([])

  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    return audioRef.current
  }, [])

  useEffect(() => {
    const audio = getAudio()

    const onTimeUpdate = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const onEnded = () => {
      setIsPlaying(false)
      const tracks = tracksRef.current
      if (tracks.length === 0) return
      setCurrentTrackId((prevId) => {
        const idx = tracks.findIndex((t) => t.id === prevId)
        const nextTrack = tracks[idx + 1]
        if (!nextTrack) return prevId
        const src = `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${nextTrack.filename}`
        audio.src = src
        currentSrcRef.current = src
        audio.load()
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
        return nextTrack.id
      })
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [getAudio])

  const play = useCallback((trackId: string, src: string) => {
    const audio = getAudio()
    if (trackId === currentSrcRef.current?.split('/').pop()?.replace(/\.mp3$/, '') && audio.src === src) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
      return
    }
    if (currentSrcRef.current === src) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
      setCurrentTrackId(trackId)
      return
    }
    audio.pause()
    audio.src = src
    currentSrcRef.current = src
    audio.load()
    setCurrentTrackId(trackId)
    setProgress(0)
    setDuration(0)
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [getAudio])

  const pause = useCallback(() => {
    getAudio().pause()
    setIsPlaying(false)
  }, [getAudio])

  const resume = useCallback(() => {
    getAudio().play().then(() => setIsPlaying(true)).catch(() => {})
  }, [getAudio])

  const seek = useCallback((percent: number) => {
    const audio = getAudio()
    if (audio.duration > 0) {
      audio.currentTime = (percent / 100) * audio.duration
    }
  }, [getAudio])

  const next = useCallback((tracks: Track[]) => {
    tracksRef.current = tracks
    setCurrentTrackId((prevId) => {
      const idx = tracks.findIndex((t) => t.id === prevId)
      const nextTrack = tracks[idx + 1]
      if (!nextTrack) return prevId
      const src = `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${nextTrack.filename}`
      const audio = getAudio()
      audio.pause()
      audio.src = src
      currentSrcRef.current = src
      audio.load()
      setProgress(0)
      setDuration(0)
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
      return nextTrack.id
    })
  }, [getAudio])

  const prev = useCallback((tracks: Track[]) => {
    tracksRef.current = tracks
    setCurrentTrackId((prevId) => {
      const idx = tracks.findIndex((t) => t.id === prevId)
      const prevTrack = tracks[idx - 1]
      if (!prevTrack) return prevId
      const src = `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${prevTrack.filename}`
      const audio = getAudio()
      audio.pause()
      audio.src = src
      currentSrcRef.current = src
      audio.load()
      setProgress(0)
      setDuration(0)
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
      return prevTrack.id
    })
  }, [getAudio])

  return { currentTrackId, isPlaying, progress, duration, play, pause, resume, seek, next, prev }
}
