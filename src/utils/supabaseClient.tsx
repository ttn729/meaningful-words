import { createClient, Session, User } from "@supabase/supabase-js";
import { Database } from "./databaseTypes";
import { createContext, useEffect, useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!);

interface AuthContextProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
};

export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchUserAndSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(user);
      setSession(session);
    };

    fetchUserAndSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};
