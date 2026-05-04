import type React from "react";

import type { Status } from "@/lib/types";
import { getStatusLabel } from "@/lib/labels";
import { Badge } from "@/components/ui/badge";

type Props = {
  status: Status;
};

function getVariant(status: Status): "active" | "paused" | "draft" {
  switch (status) {
    case "active":
      return "active";
    case "paused":
      return "paused";
    case "draft":
      return "draft";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

/** Render a colored status indicator using Badge variants. */
export function StatusBadge({ status }: Props): React.ReactElement {
  return <Badge variant={getVariant(status)}>{getStatusLabel(status)}</Badge>;
}
