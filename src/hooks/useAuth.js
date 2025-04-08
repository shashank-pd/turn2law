"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "/lib/supabaseClient";
import toast from "react-hot-toast";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    const loginPromise = supabase.auth.signInWithPassword({ email, password });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Login successful!",
      error: "Login failed. Please check your credentials.",
    });

    const { error } = await loginPromise;

    if (!error) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }

    return error;
  };

  const handleLogout = async () => {
    const logoutPromise = supabase.auth.signOut();

    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logout successful!",
      error: "Logout failed!",
    });

    const { error } = await logoutPromise;
    if (!error) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return { user, handleLogin, handleLogout };
}
