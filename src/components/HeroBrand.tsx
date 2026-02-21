type HeroBrandProps = {
  tagline: string;
};

export function HeroBrand({ tagline }: HeroBrandProps) {
  return (
    <section className="mx-auto flex h-[34vh] min-h-[220px] w-full max-w-5xl items-center justify-center overflow-hidden px-5 py-8 md:px-8">
      <div className="w-full flex justify-center">
        <div className="inline-flex flex-col items-center text-center">
          <p className="text-[clamp(3rem,12vw,8rem)] font-medium leading-none tracking-[0.3em] text-[#f4f6ff]">
            YLO
          </p>
          <div className="mt-3 w-full flex justify-center">
            <p className="text-center text-[10px] uppercase tracking-[0.34em] text-[#a7adc3]">
              {tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
