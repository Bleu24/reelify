import type { SupabaseClient } from "@supabase/supabase-js";

import type { Account, SafetyMode, Status } from "@/lib/types";

type TikTokAccountRow = {
  id: string;
  handle: string;
  display_name: string;
  status: Status;
  safety_mode: SafetyMode;
  niche: string;
};

function mapRowToAccount(row: TikTokAccountRow): Account {
  return {
    id: row.id,
    handle: row.handle,
    displayName: row.display_name,
    status: row.status,
    safetyMode: row.safety_mode,
    niche: row.niche,
  };
}

/** List connected TikTok accounts for the current user. */
export async function listAccounts(
  supabase: SupabaseClient
): Promise<Account[]> {
  const { data, error } = await supabase
    .from("tiktok_accounts")
    .select("id, handle, display_name, status, safety_mode, niche")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load accounts: ${error.message}`);
  }

  return (data ?? []).map((row) => mapRowToAccount(row as TikTokAccountRow));
}
