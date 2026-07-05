export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="eyonexLogo" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#16c27d" />
          <stop offset="1" stopColor="#3288ff" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#eyonexLogo)" />
      <path
        d="M12 14.5a8.5 8.5 0 0 1 16 0M12 25.5a8.5 8.5 0 0 0 16 0M11 20h18"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
