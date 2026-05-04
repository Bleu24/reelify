import type { SupabaseClient } from "@supabase/supabase-js";

export type EmailPasswordCredentials = {
  email: string;
  password: string;
};

/** Sign in with email/password using Supabase Auth. */
export async function signInWithEmailPassword(
  supabase: SupabaseClient,
  credentials: EmailPasswordCredentials
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/** Sign up with email/password using Supabase Auth. */
export async function signUpWithEmailPassword(
  supabase: SupabaseClient,
  credentials: EmailPasswordCredentials
): Promise<{ needsEmailConfirmation: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // If email confirmation is enabled, Supabase returns user but no session.
  const needsEmailConfirmation = !data.session;
  return { needsEmailConfirmation };
}

/** Sign out the current user. */
export async function signOut(
  supabase: SupabaseClient
): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
