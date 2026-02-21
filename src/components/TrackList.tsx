import type { Track } from "@/lib/tracks";

type TrackListProps = {
  tracks: Track[];
  activeIndex: number | null;
  clickToPlayLabel: string;
  onSelect: (index: number) => void;
};

export function TrackList({
  tracks,
  activeIndex,
  clickToPlayLabel,
  onSelect,
}: TrackListProps) {
  const latestYear = Math.max(...tracks.map((track) => track.year));

  return (
    <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-5">
      <header className="mb-2 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#a2a7be]">
          {latestYear} • {tracks.length} TRACKS
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f748a]">
          {clickToPlayLabel}
        </p>
      </header>
      <div className="space-y-1">
        {tracks.map((track, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`group w-full rounded-xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-white/20 bg-[linear-gradient(95deg,rgba(120,146,255,0.22),rgba(244,167,121,0.12))]"
                  : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="pt-[2px] text-[11px] tracking-[0.24em] text-[#8f95ac]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm tracking-[0.14em] text-[#f3f5fc]">
                      {track.title}
                    </p>
                    <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-[#8a90a8]">
                      {track.tags} • {track.releaseDate}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] tracking-[0.16em] text-[#b2b8cd]">
                  {track.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
