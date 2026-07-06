import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from "react";

/* Card ----------------------------------------------------------- */

export function Card({
  className = "",
  children,
  ...rest
}: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-neutral-200/70 bg-white shadow-card transition-shadow dark:border-neutral-800/70 dark:bg-neutral-900 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* StatCard ------------------------------------------------------- */

const TONES = {
  primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
  secondary: "bg-secondary-500/10 text-secondary-600 dark:text-secondary-400",
  accent: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
} as const;

export type Tone = keyof typeof TONES;

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "primary",
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  delta?: string;
  tone?: Tone;
}) {
  return (
    <Card className="p-5 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${TONES[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        {delta && (
          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-extrabold text-neutral-900 dark:text-white">{value}</div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{label}</div>
    </Card>
  );
}

/* ProgressBar ---------------------------------------------------- */

export function ProgressBar({ value, tone = "primary" }: { value: number; tone?: Tone }) {
  const bar = {
    primary: "from-primary-500 to-secondary-500",
    secondary: "from-secondary-500 to-primary-500",
    accent: "from-accent-500 to-primary-500",
  }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${bar} transition-all duration-700`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* WeeklyChart ---------------------------------------------------- */

export function WeeklyChart({
  data,
  unit = "min",
  className = "",
}: {
  data: { day: string; value: number }[];
  unit?: string;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={`flex items-end justify-between gap-2 ${className}`}>
      {data.map((d, i) => {
        const pct = Math.round((d.value / max) * 100);
        return (
          <div key={i} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div className="pointer-events-none absolute -top-7 z-10 rounded-lg bg-neutral-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-neutral-700">
                {d.value} {unit}
              </div>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-secondary-500 transition-all duration-500 group-hover:from-primary-600 group-hover:to-secondary-600"
                style={{ height: `${Math.max(8, pct)}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-neutral-400">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

/* RingProgress --------------------------------------------------- */

export function RingProgress({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-neutral-200 dark:stroke-neutral-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="url(#ringGrad)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#16c27d" />
            <stop offset="1" stopColor="#3288ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-extrabold text-neutral-900 dark:text-white">{label ?? `${value}%`}</span>
        {sublabel && <span className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">{sublabel}</span>}
      </div>
    </div>
  );
}
