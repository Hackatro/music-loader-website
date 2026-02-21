"use client";

import { useMemo, useState } from "react";
import { Background } from "@/components/Background";
import { HeroBrand } from "@/components/HeroBrand";
import { LyricsPanel } from "@/components/LyricsPanel";
import { PlayerBar } from "@/components/PlayerBar";
import { Topbar } from "@/components/Topbar";
import { TrackList } from "@/components/TrackList";
import { type Language, uiText } from "@/lib/i18n";
import { usePlayerStore } from "@/lib/playerStore";
import { formatTime } from "@/lib/time";

export function PageShell() {
  const [language, setLanguage] = useState<Language>("EN");
  const {
    tracks,
    currentIndex,
    isPlaying,
    hasEverPlayed,
    currentTime,
    duration,
    volume,
    setTrack,
    setVolume,
    toggle,
    next,
    prev,
    seek,
  } = usePlayerStore();
  const text = useMemo(() => uiText[language], [language]);
  const selectedTrack = currentIndex !== null ? tracks[currentIndex] : undefined;
  const currentTitle = selectedTrack?.title ?? text.selectTrack;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden text-[#e8ebf9] ${
        hasEverPlayed ? "pb-44" : "pb-10"
      }`}
    >
      <Background isPlaying={isPlaying} hasSelection={currentIndex !== null} />
      <Topbar language={language} onLanguageChange={setLanguage} />
      <section>
        <HeroBrand tagline={text.tagline} />
      </section>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-10 pt-4 md:px-8 md:pt-8">
        <div className="mb-7 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9ea4be]">
            {text.tracks}
          </span>
          <span className="h-10 w-px bg-white/20" />
        </div>
        <TrackList
          tracks={tracks}
          activeIndex={currentIndex}
          clickToPlayLabel={text.clickToPlay}
          onSelect={(index) => setTrack(index, true)}
        />
        <LyricsPanel track={selectedTrack} label={text.lyrics} />
      </main>

      {hasEverPlayed && (
        <PlayerBar
          nowPlayingLabel={text.nowPlaying}
          currentTitle={currentTitle}
          hasSelection={currentIndex !== null}
          isPlaying={isPlaying}
          currentTimeLabel={formatTime(currentTime)}
          durationLabel={formatTime(duration)}
          progressPercent={progressPercent}
          durationSeconds={duration}
          currentTimeSeconds={currentTime}
          volume={volume}
          controlsDisabled={currentIndex === null}
          onVolumeChange={setVolume}
          onPrev={prev}
          onToggle={toggle}
          onNext={next}
          onSeek={seek}
        />
      )}
    </div>
  );
}
