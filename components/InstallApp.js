"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { DownloadIcon, ShareIcon } from "./Icons";

// "Get the app" button.
// - Android / Chrome / Edge: shows the browser's own install prompt (installs the PWA).
// - iPhone / iPad: Apple doesn't allow install buttons, so we show step-by-step instructions.
// - Already installed (opened from the home screen): the button hides itself.

// The browser fires "beforeinstallprompt" when the app can be installed.
// We keep that event so the button can open the install dialog later.
let installEvent = null;
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installEvent = event;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    installEvent = null;
    notify();
  });
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getPlatform() {
  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) return "installed";
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  return installEvent ? "prompt" : "other";
}

function usePlatform() {
  return useSyncExternalStore(subscribe, getPlatform, () => "server");
}

// The home page card. Hidden when the app is already installed.
export function InstallCard() {
  const platform = usePlatform();
  if (platform === "server" || platform === "installed") return null;

  return (
    <section className="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-br from-caramel/25 to-surface p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <h2 className="font-display text-xl md:text-2xl">Bean There in your pocket</h2>
        <p className="mt-1 text-sm text-cream-muted md:text-base">
          Install the app on your phone and order your coffee in two taps.
        </p>
      </div>
      <InstallButton className="flex shrink-0 items-center gap-2 rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark" />
    </section>
  );
}

export default function InstallButton({ className = "" }) {
  const platform = usePlatform();
  const [showHelp, setShowHelp] = useState(false);

  if (platform === "server" || platform === "installed") return null;

  async function handleClick() {
    if (platform === "prompt" && installEvent) {
      installEvent.prompt();
      await installEvent.userChoice;
      installEvent = null;
      notify();
    } else {
      setShowHelp(true);
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        <DownloadIcon className="h-5 w-5" />
        Get the app
      </button>
      {showHelp && <InstallHelp ios={platform === "ios"} onClose={() => setShowHelp(false)} />}
    </>
  );
}

// Where the Share button is on iPhone depends on the browser.
function iosShareLocation() {
  const ua = navigator.userAgent;
  if (/CriOS|EdgiOS|FxiOS/.test(ua)) return "next to the address bar, at the top right";
  return "at the bottom of the screen (or in the ••• menu)";
}

function InstallHelp({ ios, onClose }) {
  const steps = ios
    ? [
        <>
          Tap the <strong className="text-cream">Share</strong> button{" "}
          <ShareIcon className="inline h-5 w-5 align-text-bottom text-caramel" /> {iosShareLocation()}.
        </>,
        <>
          Scroll down and tap <strong className="text-cream">Add to Home Screen</strong>.
        </>,
        <>
          Tap <strong className="text-cream">Add</strong>. Bean There now opens like an app.
        </>,
      ]
    : [
        <>
          Open the browser menu (<strong className="text-cream">⋮</strong> in Chrome or Edge).
        </>,
        <>
          Tap <strong className="text-cream">Install app</strong> or{" "}
          <strong className="text-cream">Add to Home screen</strong>.
        </>,
        <>
          Confirm. Bean There now opens like an app, with its own icon.
        </>,
      ];

  // Rendered directly in <body> (a "portal"), so it always sits above
  // the page and the bottom navigation bar.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-2xl shadow-black/60"
      >
        <h2 id="install-title" className="font-display text-2xl">
          Install Bean There
        </h2>
        <p className="mt-1 text-sm text-cream-muted">
          {ios ? "On iPhone it takes three taps:" : "Add it to your home screen:"}
        </p>
        <ol className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-3 text-sm text-cream-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-caramel text-xs font-semibold text-ink">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-caramel py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );
}
