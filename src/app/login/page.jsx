"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "/lib/supabaseClient";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // 👈 New state
  const { handleLogin } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/"); // 🔁 redirect if logged in
      } else {
        setCheckingSession(false); // ✅ render login form
      }
    };

    checkSession();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(email, password); // toast is handled in useAuth
    setLoading(false);
  };

  if (checkingSession) return null; // ⏳ Wait until session check is done

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2">
        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src="/bg1.jpg"
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please log in to continue
          </p>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <div className="text-right mt-1">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-xl transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
