"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "/lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.replace("/"); // Redirect to home if already logged in
      }
    };
    checkUser();
  }, []);

  const validateEmail = (email) => /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
    return regex.test(password);
  };
  
  

  const onSignup = async () => {
    const { email, password, username } = user;

    if (!email || !password || !username) {
      toast.error("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be more than 6 characters and include at least one lowercase letter, one uppercase letter, and one number.");
      return;
    }
    
    

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Check your email to confirm.");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="yourname"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="••••••••"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3.5 right-3 text-sm cursor-pointer text-blue-600"
            >
              {showPassword? "Hide" : "Show" }
            </span>
          </div>
        </div>

        <button
          onClick={onSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
