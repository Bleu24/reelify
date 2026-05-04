import type { Account, Automation, Post } from "@/lib/types";

export const accountsMock: Account[] = [
  {
    id: "acct_1",
    handle: "@kineticclips",
    displayName: "Kinetic Clips",
    status: "active",
    safetyMode: "publish",
    niche: "Creator Tools"
  },
  {
    id: "acct_2",
    handle: "@deskgrind",
    displayName: "Desk Grind",
    status: "paused",
    safetyMode: "draft",
    niche: "Productivity"
  },
  {
    id: "acct_3",
    handle: "@glowkitchen",
    displayName: "Glow Kitchen",
    status: "draft",
    safetyMode: "draft",
    niche: "Quick Recipes"
  }
];

export const connectableAccountsMock: Account[] = [
  {
    id: "acct_4",
    handle: "@pulsepilot",
    displayName: "Pulse Pilot",
    status: "active",
    safetyMode: "draft",
    niche: "Growth"
  },
  {
    id: "acct_5",
    handle: "@neonnotes",
    displayName: "Neon Notes",
    status: "draft",
    safetyMode: "draft",
    niche: "Study Hacks"
  },
  {
    id: "acct_6",
    handle: "@micromentor",
    displayName: "Micro Mentor",
    status: "paused",
    safetyMode: "draft",
    niche: "Career"
  }
];

/** Pick the next connectable TikTok account (mock) that is not already connected. */
export function connectNextTikTokAccountMock(
  connectedAccountIds: string[]
): Account | undefined {
  return connectableAccountsMock.find((a) => !connectedAccountIds.includes(a.id));
}

export const automationsMock: Automation[] = [
  {
    id: "auto_1",
    name: "Creator Tools — Daily Hooks",
    status: "active",
    niche: "Creator Tools",
    accountId: "acct_1",
    schedule: { timezone: "America/New_York", cadenceLabel: "Mon–Fri · 2 posts/day" },
    promptStyle: { format: "ugc", hookStyle: "Fast, direct, metric-driven" }
  },
  {
    id: "auto_2",
    name: "Productivity — Morning Slides",
    status: "paused",
    niche: "Productivity",
    accountId: "acct_2",
    schedule: { timezone: "America/Los_Angeles", cadenceLabel: "Daily · 1 post/day" },
    promptStyle: { format: "slideshow", hookStyle: "Calm, structured, step-by-step" }
  },
  {
    id: "auto_3",
    name: "Quick Recipes — 30s UGC",
    status: "draft",
    niche: "Quick Recipes",
    accountId: "acct_3",
    schedule: { timezone: "UTC", cadenceLabel: "Draft" },
    promptStyle: { format: "ugc", hookStyle: "Sensory, punchy, food-first" }
  },
  {
    id: "auto_4",
    name: "Creator Tools — Slideshow Experiments",
    status: "active",
    niche: "Creator Tools",
    accountId: "acct_1",
    schedule: { timezone: "America/New_York", cadenceLabel: "Tue/Thu · 1 post/day" },
    promptStyle: { format: "slideshow", hookStyle: "Contrarian, curiosity gap" }
  }
];

export const postsMock: Post[] = [
  {
    id: "post_1",
    automationId: "auto_1",
    status: "active",
    format: "ugc",
    title: "Stop writing scripts like this (do this instead)",
    createdAtIso: "2026-04-18T14:10:00.000Z"
  },
  {
    id: "post_2",
    automationId: "auto_1",
    status: "draft",
    format: "ugc",
    title: "3 prompts that always outperform your baseline",
    createdAtIso: "2026-04-19T09:02:00.000Z"
  },
  {
    id: "post_3",
    automationId: "auto_2",
    status: "paused",
    format: "slideshow",
    title: "The 5-minute planning loop that compounds",
    createdAtIso: "2026-04-17T16:45:00.000Z"
  },
  {
    id: "post_4",
    automationId: "auto_4",
    status: "active",
    format: "slideshow",
    title: "Your analytics are lying (unless you track this)",
    createdAtIso: "2026-04-20T12:30:00.000Z"
  },
  {
    id: "post_5",
    automationId: "auto_3",
    status: "draft",
    format: "ugc",
    title: "Crispy eggs in 30s: the one-pan method",
    createdAtIso: "2026-04-21T08:20:00.000Z"
  }
];

/** Get an account by id from mock data. */
export function getAccountMockById(accountId: string): Account | undefined {
  return accountsMock.find((a) => a.id === accountId);
}

/** Get an automation by id from mock data. */
export function getAutomationMockById(automationId: string): Automation | undefined {
  return automationsMock.find((a) => a.id === automationId);
}
