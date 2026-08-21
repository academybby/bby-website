import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase } from "../lib/supabaseClient";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ needsConfirmation: false }),
  signIn: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    // Supabase env vars may not be configured yet (e.g. before .env.local is set
    // up) — the rest of the site (guest checkout, browsing) must keep working, so
    // treat that as "signed out" instead of crashing the app. Deferring the
    // fallible getSupabase() call into the promise chain (rather than a
    // synchronous try/catch in the effect body) keeps every setState call inside
    // an async callback.
    Promise.resolve()
      .then(() => getSupabase())
      .then(supabase => {
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
          setSession(newSession);
        });
        unsubscribe = () => subscription.subscription.unsubscribe();
        return supabase.auth.getSession();
      })
      .then(result => {
        setSession(result.data.session);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => unsubscribe?.();
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
    // Supabase returns no session when email confirmation is required.
    return { needsConfirmation: !data.session };
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, loading, signUp, signIn, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
