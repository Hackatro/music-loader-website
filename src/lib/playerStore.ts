"use client";

import { useEffect, useSyncExternalStore } from "react";
import { tracks, type Track } from "@/lib/tracks";

type PlayerSnapshot = {
  tracks: Track[];
  currentIndex: number | null;
  isPlaying: boolean;
  hasEverPlayed: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isReady: boolean;
};

type PlayerStore = PlayerSnapshot & {
  setTrack: (index: number, autoplay?: boolean) => void;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
};

let state: PlayerSnapshot = {
  tracks,
  currentIndex: null,
  isPlaying: false,
  hasEverPlayed: false,
  volume: 0.9,
  currentTime: 0,
  duration: 0,
  isReady: false,
};

const listeners = new Set<() => void>();
let audioInstance: HTMLAudioElement | null = null;
let listenersAttached = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<PlayerSnapshot>) {
  state = { ...state, ...partial };
  emit();
}

function getTrackIndex(index: number) {
  const length = state.tracks.length;
  if (length === 0) {
    return null;
  }

  return ((index % length) + length) % length;
}

function loadTrack(index: number) {
  const audio = getAudio();
  const track = state.tracks[index];
  if (!audio || !track) {
    return null;
  }

  if (audio.src !== track.src) {
    audio.src = track.src;
  }

  audio.currentTime = 0;
  audio.load();

  return audio;
}

async function tryPlayAudio() {
  if (state.currentIndex === null) {
    return;
  }

  const audio = getAudio();
  if (!audio) {
    return;
  }

  try {
    await audio.play();
    setState({ isPlaying: true, hasEverPlayed: true });
  } catch {
    setState({ isPlaying: false });
  }
}

function onLoadedMetadata() {
  const audio = getAudio();
  if (!audio) {
    return;
  }

  setState({
    duration: Number.isFinite(audio.duration) ? audio.duration : 0,
    currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
    isReady: true,
  });
}

function onTimeUpdate() {
  const audio = getAudio();
  if (!audio) {
    return;
  }

  setState({
    currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
  });
}

function onTrackEnded() {
  if (state.currentIndex === null) {
    return;
  }

  const nextIndex = getTrackIndex(state.currentIndex + 1);
  if (nextIndex === null) {
    return;
  }

  setTrack(nextIndex, true);
}

function onPause() {
  setState({ isPlaying: false });
}

function attachAudioListeners(audio: HTMLAudioElement) {
  if (listenersAttached) {
    return;
  }

  audio.addEventListener("loadedmetadata", onLoadedMetadata);
  audio.addEventListener("timeupdate", onTimeUpdate);
  audio.addEventListener("ended", onTrackEnded);
  audio.addEventListener("pause", onPause);
  listenersAttached = true;
}

function getAudio() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioInstance) {
    audioInstance = new Audio();
    audioInstance.preload = "metadata";
    audioInstance.volume = state.volume;
    attachAudioListeners(audioInstance);
  }

  return audioInstance;
}

export function setTrack(index: number, autoplay = true) {
  const nextIndex = getTrackIndex(index);
  if (nextIndex === null) {
    return;
  }

  setState({
    currentIndex: nextIndex,
    currentTime: 0,
    duration: 0,
    isReady: false,
  });

  const audio = loadTrack(nextIndex);
  if (!audio) {
    return;
  }

  if (autoplay) {
    void play();
  } else {
    setState({ isPlaying: false });
    audio.pause();
  }
}

export async function play() {
  if (state.currentIndex === null) {
    return;
  }

  const audio = getAudio();
  if (!audio) {
    return;
  }

  await tryPlayAudio();
}

export function pause() {
  const audio = getAudio();
  if (!audio) {
    return;
  }

  audio.pause();
}

export function toggle() {
  if (state.currentIndex === null) {
    return;
  }

  if (state.isPlaying) {
    pause();
    return;
  }

  void play();
}

export function next() {
  if (state.currentIndex === null) {
    return;
  }

  const nextIndex = getTrackIndex(state.currentIndex + 1);
  if (nextIndex === null) {
    return;
  }

  setTrack(nextIndex, true);
}

export function prev() {
  if (state.currentIndex === null) {
    return;
  }

  const prevIndex = getTrackIndex(state.currentIndex - 1);
  if (prevIndex === null) {
    return;
  }

  setTrack(prevIndex, true);
}

export function seek(time: number) {
  if (state.currentIndex === null) {
    return;
  }

  const audio = getAudio();
  if (!audio) {
    return;
  }

  const safeDuration = Number.isFinite(audio.duration) ? audio.duration : state.duration;
  const max = safeDuration > 0 ? safeDuration : 0;
  const nextTime = Math.min(Math.max(time, 0), max);

  audio.currentTime = nextTime;
  setState({ currentTime: nextTime });
}

export function setVolume(volume: number) {
  const nextVolume = Math.min(Math.max(volume, 0), 1);
  setState({ volume: nextVolume });

  const audio = getAudio();
  if (!audio) {
    return;
  }

  audio.volume = nextVolume;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

function initializePlayer() {
  getAudio();
}

export function usePlayerStore(): PlayerStore {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    initializePlayer();
  }, []);

  return {
    ...snapshot,
    setTrack,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  };
}
