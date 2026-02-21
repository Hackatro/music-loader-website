import type { Track } from "@/lib/tracks";

type LyricsPanelProps = {
  track?: Track;
  label: string;
};

export function LyricsPanel({ track, label }: LyricsPanelProps) {
  const lyrics = track?.lyrics;

  if (!lyrics) {
    return null;
  }

  return (
    <section className="mt-6 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-6">
      <p className="text-[10px] uppercase tracking-[0.26em] text-[#9aa1bb]">{label}</p>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 tracking-[0.08em] text-[#d7dcee]">
        {lyrics}
      </p>
    </section>
  );
}
