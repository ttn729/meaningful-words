import { Button } from "@mui/material";
import { session, supabase, user } from "./utils/supabaseClient";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-js/dist/module/lib/types";

export default function App() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const [loggedIn, setLoggedIn] = useState<Session | null>(null);

  useEffect(() => {
    setLoggedIn(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(session);
    });
  }, [session]);

  return (
    <>
      {!loggedIn && (
        <>
          <p>Create worksheets and manage wordpacks!</p>
          <Button onClick={login} variant="contained">
            Login with Google
          </Button>
        </>
      )}

      {loggedIn && (
        <>
          <img src={user?.user_metadata.avatar_url}></img>
          <p>{user?.id}</p>
          <Button onClick={logout}>Log Out</Button>
        </>
      )}
    </>
  );
}
