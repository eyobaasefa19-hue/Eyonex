/** Shared TypeScript types for the Eyonex platform. */

/** Standard API response wrapper for async operations. */
export type Result<T, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** CEFR proficiency levels (Common European Framework of Reference). */
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Core language skill areas practiced on the platform. */
export type Skill = "speaking" | "listening" | "reading" | "writing" | "grammar" | "vocabulary" | "pronunciation";

/** A single trackable learning activity. */
export interface LearningActivity {
  id: string;
  title: string;
  skill: Skill;
  /** Completion percentage, 0–100. */
  progress: number;
  /** Estimated duration in minutes. */
  durationMin: number;
}
