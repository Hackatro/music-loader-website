"use client";

import { useEffect, useState } from "react";

type PlayerBarProps = {
  nowPlayingLabel: string;
  currentTitle: string;
  hasSelection: boolean;
  isPlaying: boolean;
  currentTimeLabel: string;
  durationLabel: string;
  progressPercent: number;
  durationSeconds: number;
  currentTimeSeconds: number;
  volume: number;
  controlsDisabled: boolean;
  onVolumeChange: (volume: number) => void;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
};

export function PlayerBar({
  nowPlayingLabel,
  currentTitle,
  hasSelection,
  isPlaying,
  currentTimeLabel,
  durationLabel,
  progressPercent,
  durationSeconds,
  currentTimeSeconds,
  volume,
  controlsDisabled,
  onVolumeChange,
  onPrev,
  onToggle,
  onNext,
  onSeek,
}: PlayerBarProps) {
  const showNowPlaying = hasSelection;
  const progressValue =
    durationSeconds > 0
      ? Math.min(Math.max(currentTimeSeconds, 0), durationSeconds)
      : 0;
  const [renderNowPlaying, setRenderNowPlaying] = useState(false);
  const [enterNowPlaying, setEnterNowPlaying] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (showNowPlaying) {
      setRenderNowPlaying(true);
      if (reduceMotion) {
        setEnterNowPlaying(true);
        return;
      }

      setEnterNowPlaying(false);
      const raf = window.requestAnimationFrame(() => setEnterNowPlaying(true));
      return () => window.cancelAnimationFrame(raf);
    }

    setEnterNowPlaying(false);
    setRenderNowPlaying(false);
  }, [showNowPlaying]);

  return (
    <footer className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#07090f]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 md:flex-row md:items-center md:justify-between md:px-8">
        {renderNowPlaying && (
          <div
            className={`min-w-0 motion-reduce:transition-none transition-[opacity,transform] duration-500 ease-out ${
              enterNowPlaying
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8189a3]">
              {nowPlayingLabel}
            </p>
            <p className="mt-1 truncate text-sm tracking-[0.13em] text-[#f0f3ff]">
              {currentTitle}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2 md:ml-auto">
          <ControlButton
            ariaLabel="Previous"
            onClick={onPrev}
            disabled={controlsDisabled}
            icon={<IconPrev />}
          />
          <ControlButton
            ariaLabel={isPlaying ? "Pause" : "Play"}
            onClick={onToggle}
            disabled={controlsDisabled}
            primary
            icon={isPlaying ? <IconPause /> : <IconPlay />}
          />
          <ControlButton
            ariaLabel="Next"
            onClick={onNext}
            disabled={controlsDisabled}
            icon={<IconNext />}
          />
        </div>
        <div className="w-full max-w-xs md:w-64">
          <div className="mb-1 flex justify-between text-[10px] tracking-[0.16em] text-[#8f96b0]">
            <span>{currentTimeLabel}</span>
            <span>{durationLabel}</span>
          </div>
          <div className="relative">
            <div className="h-[3px] rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-white/70"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={durationSeconds > 0 ? durationSeconds : 1}
              step={0.01}
              value={progressValue}
              onChange={(event) => onSeek(Number(event.target.value))}
              disabled={controlsDisabled || durationSeconds <= 0}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed"
              aria-label="Seek"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#9fa5bc] md:w-28 md:justify-end">
          <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            className="h-[3px] w-20 cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
            aria-label="Volume"
          />
        </div>
      </div>
    </footer>
  );
}

function ControlButton({
  ariaLabel,
  onClick,
  icon,
  disabled = false,
  primary = false,
}: {
  ariaLabel: "Previous" | "Play" | "Pause" | "Next";
  onClick: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090f] ${
        disabled
          ? "cursor-not-allowed border-white/10 text-[#7f8599]"
          : primary
          ? "border-white/30 bg-white text-black hover:bg-[#eceff8]"
          : "border-white/20 text-[#c6ccdf] hover:border-white/35 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5L8 5.5z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <rect x="7" y="5.5" width="3.5" height="13" rx="1" />
      <rect x="13.5" y="5.5" width="3.5" height="13" rx="1" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M7 6h2v12H7z" />
      <path d="M18 6.5v11L10 12l8-5.5z" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M15 6h2v12h-2z" />
      <path d="M6 6.5v11L14 12 6 6.5z" />
    </svg>
  );
}
