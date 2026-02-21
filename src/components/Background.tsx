type BackgroundProps = {
  isPlaying: boolean;
  hasSelection?: boolean;
};

export function Background({ isPlaying, hasSelection = false }: BackgroundProps) {
  const filterClass = isPlaying
    ? "blur-[12px] grayscale-0 brightness-[0.78] saturate-[1.35] contrast-[1.1]"
    : "blur-[22px] grayscale brightness-[0.62] saturate-[0.7] contrast-[1.05]";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#06070c]" />
      <div
        data-testid="neon-background"
        className={`absolute inset-[-4%] bg-cover bg-center transition-[filter,transform,opacity] duration-[500ms] ease-[ease] ${filterClass} ${
          hasSelection ? "opacity-85 scale-[1.01]" : "opacity-70 scale-[1.03]"
        }`}
        style={{ backgroundImage: "url('/bg-neon.png')" }}
      />
      <div className="absolute -left-24 top-[-18rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(84,112,255,0.12),rgba(84,112,255,0)_70%)]" />
      <div className="absolute -right-24 bottom-[-20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,189,127,0.05),rgba(255,189,127,0)_70%)]" />
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(110,165,255,0.16),rgba(110,165,255,0)_56%)] transition-opacity duration-[450ms] ease-[ease] ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.12]" />
    </div>
  );
}
