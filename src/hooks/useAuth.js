import { useState, useEffect } from "react";
import { supabase } from "/lib/supabaseClient"; // Make sure the path is correct

const useAuth = () => {
  const [user, setUser] = useState(null);

  // Get the user and subscribe to auth state changes
  useEffect(() => {
    const getUser = async () => {
      const { data: currentUser } = await supabase.auth.getUser();
      setUser(currentUser);
    };

    getUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    
    return () => {
        // Clean up the listener when the component is unmounted
        authListener.data?.unsubscribe();
      };
    }, []);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear the user from state
  };

  return { user, handleLogout };
};

export default useAuth;
