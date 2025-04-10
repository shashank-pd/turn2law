'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "/lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Set the session from the token in URL
  useEffect(() => {
    const setSession = async () => {
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          toast.error("Session error: " + error.message);
        }
      }
    };

    setSession();
  }, [access_token, refresh_token]);

  // Step 2: Handle password update
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      router.push("/"); // Or redirect to dashboard if needed
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleReset} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
