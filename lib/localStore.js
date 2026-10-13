"use client";

import { useSyncExternalStore } from "react";

// A small store that keeps a value in localStorage (the browser's memory)
// and notifies every component when the value changes.
export function createLocalStore(key, initial) {
  let value = initial;
  let loaded = false;
  const listeners = new Set();

  function get() {
    if (!loaded) {
      loaded = true;
      try {
        const saved = localStorage.getItem(key);
        if (saved) value = JSON.parse(saved);
      } catch {
        value = initial;
      }
    }
    return value;
  }

  function set(next) {
    value = typeof next === "function" ? next(get()) : next;
    localStorage.setItem(key, JSON.stringify(value));
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.add(listener);
    // If the site is open in two tabs, keep them in sync.
    const onStorage = (event) => {
      if (event.key === key) {
        loaded = false;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue() {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, useValue };
}
