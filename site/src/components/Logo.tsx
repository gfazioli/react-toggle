export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size * 2} height={size} viewBox="0 0 32 16" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-accent-2)" />
        </linearGradient>
      </defs>
      <rect width="32" height="16" rx="8" fill="url(#logo-grad)" />
      <circle cx="24" cy="8" r="5.5" fill="white" />
    </svg>
  );
}
