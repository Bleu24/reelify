import type React from "react";

import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostFormatLabel } from "@/lib/labels";
import { automationsMock, postsMock } from "@/lib/mockData";

const DashboardPage = (): React.ReactElement => {
  const activeAutomationsCount = automationsMock.filter((a) => a.status === "active").length;
  const draftPostsCount = postsMock.filter((p) => p.status === "draft").length;
  const recentPosts = postsMock.slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="High-level signals across accounts, automations, and posts."
        actions={
          <Button asChild variant="gradient">
            <Link href="/automations">New automation</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active automations</CardTitle>
            <CardDescription>Currently running workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{activeAutomationsCount}</div>
            <div className="mt-2 text-xs text-white/50">
              Mock data · no background jobs
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Draft posts</CardTitle>
            <CardDescription>Waiting for review / scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{draftPostsCount}</div>
            <div className="mt-2 text-xs text-white/50">
              Safety mode can force drafts
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System state</CardTitle>
            <CardDescription>Prototype constraints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="active" />
              <StatusBadge status="paused" />
              <StatusBadge status="draft" />
            </div>
            <div className="mt-2 text-xs text-white/50">
              Status badges are variant-driven
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent posts</CardTitle>
            <CardDescription>Latest generated items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-white/10">
              {recentPosts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-white/90">{p.title}</div>
                    <div className="mt-1 text-xs text-white/50">
                      {getPostFormatLabel(p.format)} · {new Date(p.createdAtIso).toLocaleString()}
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
