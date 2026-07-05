/**
 * Tiny class-name combiner.
 *
 * Accepts strings, falsy values, and objects ({ [cls]: boolean }) and returns
 * a single de-duplicated string. Lightweight stand-in for `clsx`/`cn` so the
 * foundation has zero runtime deps beyond the framework.
 */
export function cn(...inputs: Array<string | false | null | undefined | Record<string, boolean>>): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [cls, on] of Object.entries(input)) {
        if (on) classes.push(cls);
      }
    }
  }
  return classes.join(" ");
}

/** Format a number with thousands separators (e.g. 1840 -> "1,840"). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Truncate text to `max` characters, appending an ellipsis when cut. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "\u2026";
}

/** Return initials (up to 2 chars) from a name or email. */
export function initialsFrom(value: string): string {
  const clean = value.split("@")[0]?.trim() ?? "";
  if (!clean) return "?";
  const parts = clean.split(/[._\s-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}
