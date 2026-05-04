import * as React from "react";

type Props = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

/** Render a consistent page header with optional actions. */
export function PageHeader({ title, description, actions }: Props): React.ReactElement {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-white/60">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
