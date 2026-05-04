import type { PostFormat, SafetyMode, Status } from "@/lib/types";

/** Format a raw post format value into a human-readable label. */
export function getPostFormatLabel(format: PostFormat): string {
  switch (format) {
    case "slideshow":
      return "Slideshow";
    case "ugc":
      return "UGC";
    default: {
      const _exhaustive: never = format;
      return _exhaustive;
    }
  }
}

/** Format a raw status value into a human-readable label. */
export function getStatusLabel(status: Status): string {
  switch (status) {
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "draft":
      return "Draft";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

/** Format a safety mode into a human-readable label. */
export function getSafetyModeLabel(mode: SafetyMode): string {
  switch (mode) {
    case "publish":
      return "Publish";
    case "draft":
      return "Draft";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}
