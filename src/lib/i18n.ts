export type Language = "EN" | "DE";

type Copy = {
  tagline: string;
  tracks: string;
  lyrics: string;
  clickToPlay: string;
  nowPlaying: string;
  selectTrack: string;
  prev: string;
  play: string;
  pause: string;
  next: string;
};

export const uiText: Record<Language, Copy> = {
  EN: {
    tagline: "Everything, you express",
    tracks: "TRACKS",
    lyrics: "LYRICS",
    clickToPlay: "Click to play",
    nowPlaying: "NOW PLAYING",
    selectTrack: "Select a track",
    prev: "PREV",
    play: "PLAY",
    pause: "PAUSE",
    next: "NEXT",
  },
  DE: {
    tagline: "Alles, was du ausdrueckst",
    tracks: "TRACKS",
    lyrics: "LYRICS",
    clickToPlay: "Klicken zum Abspielen",
    nowPlaying: "JETZT LAEUFT",
    selectTrack: "Track auswaehlen",
    prev: "ZURUECK",
    play: "PLAY",
    pause: "PAUSE",
    next: "WEITER",
  },
};
