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
      {showHelp && <InstallHelp onClose={() => setShowHelp(false)} />}
    </>
  );
}

const B = ({ children }) => <strong className="text-cream">{children}</strong>;
const Share = () => <ShareIcon className="inline h-5 w-5 align-text-bottom text-caramel" />;

// Step-by-step install instructions for the browser the visitor is using.
// (Used when the browser can't show its own install dialog, e.g. on iPhone.)
function getGuide() {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const done = (
    <>
      Bean There now opens like an app, with its own icon.
    </>
  );

  if (isIOS) {
    // Chrome, Edge and Firefox on iPhone keep Share next to the address bar; Safari at the bottom.
    const otherBrowser = /CriOS|EdgiOS|FxiOS/.test(ua);
    return {
      intro: "On iPhone it takes three taps:",
      steps: [
        <>
          Tap <B>Share</B> <Share />{" "}
          {otherBrowser ? "next to the address bar, at the top right." : "at the bottom of the screen (or in the ••• menu)."}
        </>,
        <>
          Scroll down and tap <B>Add to Home Screen</B>.
        </>,
        <>
          Tap <B>Add</B>. {done}
        </>,
      ],
    };
  }

  if (isAndroid && /SamsungBrowser/.test(ua)) {
    return {
      intro: "In Samsung Internet:",
      steps: [
        <>
          Tap the menu <B>☰</B> at the bottom right.
        </>,
        <>
          Tap <B>Add page to</B>, then <B>Home screen</B>.
        </>,
        <>
          Tap <B>Add</B>. {done}
        </>,
      ],
    };
  }

  if (isAndroid) {
    return {
      intro: "Add it to your home screen:",
      steps: [
        <>
          Open the browser menu <B>⋮</B> (top right, or bottom right in Firefox).
        </>,
        <>
          Tap <B>Install app</B>, <B>Install</B> or <B>Add to Home screen</B>.
        </>,
        <>
          Confirm. {done}
        </>,
      ],
    };
  }

  if (/Firefox/.test(ua)) {
    return {
      intro: "Firefox on computers can't install web apps yet.",
      steps: [
        <>
          Open <B>beantherecafe.vercel.app</B> in <B>Chrome</B> or <B>Edge</B> and click <B>Get the app</B> there,
        </>,
        <>
          or open the same address on your <B>phone</B> and install it from there.
        </>,
      ],
    };
  }

  if (/Safari/.test(ua) && !/Chrome|Chromium|Edg\//.test(ua)) {
    return {
      intro: "In Safari on Mac:",
      steps: [
        <>
          Click <B>File</B> in the menu bar (or the <B>Share</B> button <Share />).
        </>,
        <>
          Click <B>Add to Dock</B>.
        </>,
        <>
          Click <B>Add</B>. {done}
        </>,
      ],
    };
  }

  return {
    intro: "Install it from your browser:",
    steps: [
      <>
        Look for the <B>install</B> icon at the right end of the address bar, or open the browser menu <B>⋮</B>.
      </>,
      <>
        Click <B>Install Bean There</B> (or <B>Apps → Install this site as an app</B>).
      </>,
      <>
        Confirm. {done}
      </>,
    ],
  };
}

function InstallHelp({ onClose }) {
  const { intro, steps } = getGuide();

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
      {/* Scrolls on its own if it doesn't fit on a small screen */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto overscroll-contain rounded-3xl bg-surface p-6 shadow-2xl shadow-black/60"
      >
        <h2 id="install-title" className="font-display text-2xl">
          Install Bean There
        </h2>
        <p className="mt-1 text-sm text-cream-muted">{intro}</p>
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
