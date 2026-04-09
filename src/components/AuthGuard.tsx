import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth", { replace: true });
      } else {
        setAuthed(true);
      }
      setChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!checked || !authed) {
    return <div className="container mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  return <>{children}</>;
};

export default AuthGuard;
