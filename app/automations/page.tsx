import type React from "react";

import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostFormatLabel } from "@/lib/labels";
import { automationsMock, getAccountMockById } from "@/lib/mockData";

const AutomationsPage = (): React.ReactElement => {
  return (
    <div>
      <PageHeader
        title="Automations"
        description="Configured workflows: niche + account + schedule + prompt settings."
        actions={<Button variant="outline">Create (stub)</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {automationsMock.map((a) => {
          const account = getAccountMockById(a.accountId);

          return (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-display">
                      {a.name}
                    </CardTitle>
                    <CardDescription>
                      {a.niche} · {account ? account.handle : "Unknown account"}
                    </CardDescription>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Schedule</span>
                    <span className="text-white/90">{a.schedule.cadenceLabel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Timezone</span>
                    <span className="text-white/90">{a.schedule.timezone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Format</span>
                    <span className="text-white/90">{getPostFormatLabel(a.promptStyle.format)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Hook style</span>
                    <span className="text-white/90">{a.promptStyle.hookStyle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AutomationsPage;
