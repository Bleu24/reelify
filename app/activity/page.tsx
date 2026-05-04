import type React from "react";

import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ActivityPage = (): React.ReactElement => {
  return (
    <div>
      <PageHeader
        title="Activity"
        description="Event stream (stub). No background jobs in this prototype."
      />

      <Card>
        <CardHeader>
          <CardTitle>Nothing here yet</CardTitle>
          <CardDescription>
            This will show automation runs, post generations, and publish outcomes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-white/70">
            For now, Reelify is mock-only and has no realtime events.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPage;
