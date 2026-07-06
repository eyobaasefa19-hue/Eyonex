import type { ComponentType, SVGProps } from "react";
import {
  BookIcon,
  ChartIcon,
  ChatIcon,
  GearIcon,
  HeadphonesIcon,
  HomeIcon,
  LayersIcon,
  MicIcon,
  NoteIcon,
  PencilIcon,
  EyeIcon,
  SpeechIcon,
  TargetIcon,
} from "@/components/icons";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
};

export type NavGroup = {
  heading: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Overview",
    items: [
      { label: "Home", href: "/dashboard", icon: HomeIcon },
      { label: "AI Tutor", href: "/dashboard/ai-tutor", icon: ChatIcon, badge: "New" },
      { label: "Progress", href: "/dashboard/progress", icon: ChartIcon },
    ],
  },
  {
    heading: "Skills",
    items: [
      { label: "Vocabulary", href: "/dashboard/vocabulary", icon: BookIcon },
      { label: "Grammar", href: "/dashboard/grammar", icon: PencilIcon },
      { label: "Speaking", href: "/dashboard/speaking", icon: MicIcon },
      { label: "Listening", href: "/dashboard/listening", icon: HeadphonesIcon },
      { label: "Reading", href: "/dashboard/reading", icon: EyeIcon },
      { label: "Writing", href: "/dashboard/writing", icon: SpeechIcon },
      { label: "Pronunciation", href: "/dashboard/pronunciation", icon: TargetIcon },
    ],
  },
  {
    heading: "Library",
    items: [
      { label: "Flashcards", href: "/dashboard/flashcards", icon: LayersIcon },
      { label: "Notes", href: "/dashboard/notes", icon: NoteIcon },
    ],
  },
  {
    heading: "Account",
    items: [{ label: "Settings", href: "/dashboard/settings", icon: GearIcon }],
  },
];
