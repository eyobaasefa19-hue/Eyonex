"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { AuthShell } from "./AuthShell";
import { ArrowRightIcon, CheckCircleIcon } from "./icons";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const result = isSignup
      ? await signUp(email.trim(), password)
      : await signIn(email.trim(), password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (isSignup) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 900);
    } else {
      router.push("/dashboard");
    }
  }

  if (success) {
    return (
      <AuthShell>
        <div className="glass-card flex flex-col items-center rounded-3xl p-8 text-center shadow-card">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <CheckCircleIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-neutral-900 dark:text-white">
            Account created!
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Taking you to your dashboard…
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="glass-card rounded-3xl p-7 shadow-card sm:p-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {isSignup
              ? "Start practicing English with your AI tutor today."
              : "Sign in to continue your learning journey."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            required
          />
          <Field
            id="password"
            label="Password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={setPassword}
            placeholder="At least 6 characters"
            required
          />

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Spinner /> {isSignup ? "Creating account…" : "Signing in…"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                {isSignup ? "Create account" : "Sign in"}
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Sign up free
              </Link>
            </>
          )}
        </p>
      </div>
    </AuthShell>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
      />
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}
