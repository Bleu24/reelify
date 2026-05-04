export type Status = "active" | "paused" | "draft";
export type PostFormat = "slideshow" | "ugc";
export type SafetyMode = "publish" | "draft";

export type Account = {
  id: string;
  handle: string;
  displayName: string;
  status: Status;
  safetyMode: SafetyMode;
  niche: string;
};

export type Automation = {
  id: string;
  name: string;
  status: Status;
  niche: string;
  accountId: string;
  schedule: {
    timezone: string;
    cadenceLabel: string;
  };
  promptStyle: {
    format: PostFormat;
    hookStyle: string;
  };
};

export type Post = {
  id: string;
  automationId: string;
  status: Status;
  format: PostFormat;
  title: string;
  createdAtIso: string;
};
