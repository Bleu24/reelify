import type React from "react";

import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostFormatLabel } from "@/lib/labels";
import { getAutomationMockById, postsMock } from "@/lib/mockData";

const PostsPage = (): React.ReactElement => {
  return (
    <div>
      <PageHeader
        title="Posts"
        description="A single generated content item tied to an automation."
      />

      <div className="grid gap-4">
        {postsMock.map((p) => {
          const automation = getAutomationMockById(p.automationId);

          return (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-display">
                      {p.title}
                    </CardTitle>
                    <CardDescription>
                      {automation ? automation.name : "Unknown automation"} · {getPostFormatLabel(p.format)}
                    </CardDescription>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/70">
                  Created: {new Date(p.createdAtIso).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PostsPage;
