export default function Swoosh({ className = '', opacity = 0.1 }: { className?: string; opacity?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMax slice" className={className} style={{ opacity }} fill="none" strokeLinecap="round">
      <path d="M-80 640 C 220 520, 520 380, 760 140 C 860 40, 980 -20, 1120 -60" stroke="#E8B820" strokeWidth="56" />
      <path d="M-40 720 C 260 600, 560 470, 820 240 C 930 140, 1060 70, 1220 20" stroke="#D0D0DE" strokeWidth="44" />
      <path d="M0 800 C 300 690, 610 560, 880 340 C 1000 240, 1120 170, 1300 110" stroke="#2E4FA0" strokeWidth="36" />
    </svg>
  )
}
