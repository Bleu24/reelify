import type React from "react";

import type { SafetyMode } from "@/lib/types";
import { getSafetyModeLabel } from "@/lib/labels";
import { Badge } from "@/components/ui/badge";

type Props = {
  mode: SafetyMode;
};

function getVariant(mode: SafetyMode): "publish" | "safetyDraft" {
  switch (mode) {
    case "publish":
      return "publish";
    case "draft":
      return "safetyDraft";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

/** Render a colored safety mode indicator using Badge variants. */
export function SafetyModeBadge({ mode }: Props): React.ReactElement {
  return <Badge variant={getVariant(mode)}>{getSafetyModeLabel(mode)}</Badge>;
}
