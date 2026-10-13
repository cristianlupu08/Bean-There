// Floating coffee beans and soft glows.
// - Wide screens: beans fill the empty space on the left and right.
// - Phones and tablets: smaller beans peek in half-hidden from the screen edges,
//   behind the content, so they never cover text or buttons.

// Small beans for narrow screens. A negative offset hides half of each bean off-screen.
const EDGE_BEANS = [
  { side: "left", top: "11%", offset: "-14px", size: 34, rotate: 25, duration: 14, delay: 0, opacity: 0.55 },
  { side: "right", top: "24%", offset: "-12px", size: 28, rotate: -35, duration: 17, delay: -5, opacity: 0.45 },
  { side: "left", top: "41%", offset: "-12px", size: 26, rotate: -15, duration: 19, delay: -9, opacity: 0.42 },
  { side: "right", top: "53%", offset: "-16px", size: 38, rotate: 40, duration: 15, delay: -3, opacity: 0.55 },
  { side: "left", top: "68%", offset: "-15px", size: 36, rotate: 55, duration: 18, delay: -12, opacity: 0.5 },
  { side: "right", top: "80%", offset: "-11px", size: 26, rotate: -50, duration: 16, delay: -7, opacity: 0.42 },
];

const BEANS = [
  { top: "12%", offset: "3%", size: 46, rotate: -20, duration: 15, delay: 0, opacity: 0.5 },
  { top: "30%", offset: "8%", size: 28, rotate: 35, duration: 19, delay: -6, opacity: 0.35 },
  { top: "48%", offset: "2%", size: 60, rotate: 10, duration: 17, delay: -3, opacity: 0.45 },
  { top: "66%", offset: "7%", size: 34, rotate: -45, duration: 21, delay: -10, opacity: 0.3 },
  { top: "82%", offset: "3.5%", size: 42, rotate: 60, duration: 16, delay: -8, opacity: 0.4 },
];

export default function SideDecor() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden xl:hidden">
        <div className="absolute -right-24 -top-16 h-64 w-64 rounded-full bg-caramel/10 blur-3xl motion-safe:animate-drift" />
        {EDGE_BEANS.map((bean, i) => (
          <Bean key={i} bean={bean} side={bean.side} />
        ))}
      </div>
      <WideDecor />
    </>
  );
}

function WideDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden xl:block">
      {/* Soft glows */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-caramel/10 blur-3xl motion-safe:animate-drift" />
      <div
        className="absolute -right-32 top-2/3 h-[28rem] w-[28rem] rounded-full bg-caramel/10 blur-3xl motion-safe:animate-drift"
        style={{ animationDelay: "-12s" }}
      />

      {/* Beans on the left and mirrored on the right */}
      {BEANS.map((bean, i) => (
        <Bean key={`l${i}`} bean={bean} side="left" />
      ))}
      {BEANS.map((bean, i) => (
        <Bean key={`r${i}`} bean={{ ...bean, top: `calc(${bean.top} + 6%)`, rotate: -bean.rotate }} side="right" />
      ))}
    </div>
  );
}

function Bean({ bean, side }) {
  return (
    <svg
      viewBox="0 0 40 56"
      width={bean.size}
      height={bean.size * 1.4}
      className="absolute text-caramel motion-safe:animate-float"
      style={{
        top: bean.top,
        [side]: bean.offset,
        opacity: bean.opacity,
        "--r": `${bean.rotate}deg`,
        transform: `rotate(${bean.rotate}deg)`,
        animationDuration: `${bean.duration}s`,
        animationDelay: `${bean.delay}s`,
      }}
    >
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="currentColor" />
      <path
        d="M20 5 C 11 18, 29 38, 20 51"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
