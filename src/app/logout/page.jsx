"use client"
import { supabase } from "/lib/supabaseClient";

export default function Logout() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    console.log("User logged out successfully.");
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
