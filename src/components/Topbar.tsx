import type { Language } from "@/lib/i18n";

type TopbarProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const languages: Language[] = ["EN", "DE"];

export function Topbar({ language, onLanguageChange }: TopbarProps) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-end gap-4 px-5 pt-8 md:px-8 md:pt-10">
      <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
        {languages.map((lang) => {
          const isActive = lang === language;
          return (
            <button
              key={lang}
              type="button"
              onClick={() => onLanguageChange(lang)}
              className={`rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-[#b5b9cc] hover:text-white"
              }`}
            >
              {lang}
            </button>
          );
        })}
      </div>
    </header>
  );
}
