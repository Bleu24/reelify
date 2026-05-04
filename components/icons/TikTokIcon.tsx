import type React from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

/** Render a small TikTok-style logo mark as an inline SVG. */
export function TikTokIcon({ className, title = "TikTok" }: Props): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <title>{title}</title>
      <path
        d="M14 3c.7 2.7 2.6 4.8 5 5.4V11c-1.9-.1-3.6-.8-5-1.9v6.4c0 3-2.4 5.5-5.5 5.5S3 18.6 3 15.5 5.4 10 8.5 10c.4 0 .8.1 1.2.2v2.9c-.4-.2-.8-.3-1.2-.3-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5S11 18.7 11 17.3V3h3z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M11 3h3c.5 2.2 2.3 4.1 5 4.7v2.2c-2-.3-3.7-1.2-5-2.6v6.2c0 3-2.4 5.5-5.5 5.5-1.5 0-2.9-.6-3.9-1.6 1 1.6 2.8 2.6 4.8 2.6 3 0 5.5-2.4 5.5-5.5V8.9c1.3 1.1 3 1.8 5 1.9V8.4c-2.4-.6-4.3-2.7-5-5.4H11z"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  );
}
