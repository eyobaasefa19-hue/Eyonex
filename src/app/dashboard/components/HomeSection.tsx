"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import {
  ArrowRightIcon,
  BoltIcon,
  BookIcon,
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  MicIcon,
  PlusIcon,
  SparklesIcon,
  TargetIcon,
  TrendIcon,
  TrophyIcon,
} from "@/components/icons";
import { Card, CardHeader, ProgressBar, RingProgress, StatCard, WeeklyChart } from "./ui";

const STATS = [
  { icon: FireIcon, label: "Day streak", value: "12", delta: "+2", tone: "accent" as const },
  { icon: MicIcon, label: "Words spoken", value: "1,840", delta: "+120", tone: "secondary" as const },
  { icon: CheckCircleIcon, label: "Grammar fixed", value: "96", delta: "+8", tone: "primary" as const },
  { icon: TrendIcon, label: "Fluency score", value: "86%", delta: "+4%", tone: "primary" as const },
];

const WEEK = [
  { day: "M", value: 24 },
  { day: "T", value: 38 },
  { day: "W", value: 15 },
  { day: "T", value: 45 },
  { day: "F", value: 30 },
  { day: "S", value: 52 },
  { day: "S", value: 18 },
];

const LESSONS = [
  { title: "Ordering at a restaurant", subtitle: "Speaking · 6 min", progress: 75, href: "/dashboard/speaking" },
  { title: "Past vs. present perfect", subtitle: "Grammar · 8 min", progress: 40, href: "/dashboard/grammar" },
  { title: "Small talk at work", subtitle: "Conversation · 10 min", progress: 20, href: "/dashboard/ai-tutor" },
];

const ACTIVITY = [
  { icon: CheckCircleIcon, text: "Completed “Travel vocabulary” set", time: "2h ago", tone: "primary" as const },
  { icon: MicIcon, text: "Practiced pronunciation · 8 min", time: "5h ago", tone: "secondary" as const },
  { icon: BookIcon, text: "Added 6 new flashcards", time: "Yesterday", tone: "accent" as const },
  { icon: TrophyIcon, text: "Reached a 12-day streak!", time: "Yesterday", tone: "accent" as const },
];

const QUICK_ACTIONS = [
  { label: "Talk to AI Tutor", icon: ChatIcon, href: "/dashboard/ai-tutor", tone: "primary" as const },
  { label: "Practice speaking", icon: MicIcon, href: "/dashboard/speaking", tone: "secondary" as const },
  { label: "Review flashcards", icon: BookIcon, href: "/dashboard/flashcards", tone: "accent" as const },
  { label: "Take a quiz", icon: TargetIcon, href: "/dashboard/grammar", tone: "primary" as const },
];

const TONE_BG = {
  primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
  secondary: "bg-secondary-500/10 text-secondary-600 dark:text-secondary-400",
  accent: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
};

export function HomeSection() {
  const { user } = useAuth();
  const displayName = (user?.email ?? "learner").split("@")[0];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-6 text-white shadow-glow-lg sm:p-8">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-30" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <SparklesIcon className="h-4 w-4" /> Welcome back
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hi, {displayName}!
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/90 sm:text-base">
              Ready for today&apos;s practice? Your AI tutor has a new conversation scenario waiting.
            </p>
          </div>
          <Link
            href="/dashboard/ai-tutor"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <ChatIcon className="h-4 w-4" /> Start today&apos;s lesson
          </Link>
        </div>
      </section>

      {/* Daily goal + Streak + CEFR level */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* Daily learning goal */}
        <Card className="p-6">
          <CardHeader
            title="Daily goal"
            subtitle="3 of 5 tasks done"
            action={
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
                <TargetIcon className="h-5 w-5" />
              </span>
            }
          />
          <div className="mt-5 flex items-center gap-5">
            <RingProgress value={60} label="3/5" sublabel="tasks" size={104} stroke={9} />
            <ul className="flex-1 space-y-2">
              {[
                { t: "10 min speaking", done: true },
                { t: "Grammar review", done: true },
                { t: "Vocabulary set", done: true },
                { t: "Listening drill", done: false },
                { t: "Daily review", done: false },
              ].map((task) => (
                <li key={task.t} className="flex items-center gap-2.5 text-sm">
                  <CheckCircleIcon
                    className={`h-4 w-4 shrink-0 ${task.done ? "text-primary-500" : "text-neutral-300 dark:text-neutral-600"}`}
                  />
                  <span className={task.done ? "text-neutral-400 line-through dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}>
                    {task.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Streak card */}
        <Card className="relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent-500/15 blur-2xl" />
          <CardHeader
            title="Streak"
            action={
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <FireIcon className="h-5 w-5" />
              </span>
            }
          />
          <div className="mt-5 flex items-end gap-2">
            <span className="font-display text-5xl font-extrabold text-neutral-900 dark:text-white">12</span>
            <span className="mb-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">days</span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const done = i < 5;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                      done
                        ? "bg-gradient-to-br from-accent-400 to-accent-600 text-white"
                        : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600"
                    }`}
                  >
                    {done ? <FireIcon className="h-3.5 w-3.5" /> : d}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Practice today to keep your streak alive!
          </p>
        </Card>

        {/* CEFR level card */}
        <Card className="p-6">
          <CardHeader
            title="CEFR level"
            subtitle="Common European Framework"
            action={
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-500/10 text-secondary-600 dark:text-secondary-400">
                <TrophyIcon className="h-5 w-5" />
              </span>
            }
          />
          <div className="mt-5 flex items-center gap-4">
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-primary-500 font-display text-3xl font-extrabold text-white shadow-glow">
              B1
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <span>B1 Intermediate</span>
                <span>B2</span>
              </div>
              <ProgressBar value={65} tone="secondary" />
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                65% to <span className="font-semibold text-secondary-600 dark:text-secondary-400">B2 Upper-intermediate</span>
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Learning statistics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={s.delta} tone={s.tone} />
        ))}
      </section>

      {/* Weekly chart + Recent activity */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <CardHeader
            title="Weekly progress"
            subtitle="Minutes practiced each day"
            action={
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <ClockIcon className="h-4 w-4" />
                222 min total
              </div>
            }
          />
          <WeeklyChart data={WEEK} className="mt-6 h-44" />
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <MiniStat label="Best day" value="52 min" />
            <MiniStat label="Avg / day" value="32 min" />
            <MiniStat label="Active days" value="5 / 7" />
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-6">
          <CardHeader title="Recent activity" subtitle="Your latest moves" />
          <ul className="mt-5 space-y-4">
            {ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TONE_BG[a.tone]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{a.text}</p>
                    <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      {/* Continue learning + Quick actions */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <CardHeader
            title="Continue learning"
            subtitle="Pick up where you left off"
            action={
              <Link href="/dashboard/progress" className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
                View all
              </Link>
            }
          />
          <div className="mt-5 space-y-3">
            {LESSONS.map((lesson) => (
              <Link
                key={lesson.title}
                href={lesson.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-200/60 bg-neutral-50/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card dark:border-neutral-800/60 dark:bg-neutral-800/30 dark:hover:border-primary-700"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{lesson.title}</div>
                  <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{lesson.subtitle}</div>
                  <div className="mt-2">
                    <ProgressBar value={lesson.progress} />
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">{lesson.progress}%</span>
                  <ArrowRightIcon className="h-4 w-4 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-500 dark:text-neutral-600" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="p-6">
          <CardHeader title="Quick actions" subtitle="Jump back in" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-neutral-200/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card dark:border-neutral-800/60 dark:hover:border-primary-700"
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${TONE_BG[a.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{a.label}</span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/dashboard/notes"
            className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 p-3 text-sm font-medium text-neutral-500 transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-primary-600 dark:hover:text-primary-400"
          >
            <PlusIcon className="h-4 w-4" /> New note
          </Link>
        </Card>
      </section>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-bold text-neutral-900 dark:text-white">{value}</div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{label}</div>
    </div>
  );
}
