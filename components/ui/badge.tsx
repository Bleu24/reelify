import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground",

        active: "border-transparent bg-cyan-500/15 text-cyan-300",
        paused: "border-transparent bg-fuchsia-500/15 text-fuchsia-300",
        draft: "border-transparent bg-white/10 text-white/70",

        publish: "border-transparent bg-pink-500/15 text-pink-300",
        safetyDraft: "border-transparent bg-white/10 text-white/70"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

/** Render a small chip-like badge with variants. */
export function Badge({ className, variant, ...props }: BadgeProps): React.ReactElement {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
