"use client";
import Link from "next/link";
import React from "react";
import axios from "axios"; // ✅ fixed import
import { useRouter } from "next/navigation";


export default function Loginpage() {
    const router = useRouter(); // useful for redirect later
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });


    const onLogin = async () => {
        try {
            const res = await axios.post("/api/users/signup", user);
            console.log("Signup success:", res.data);
            router.push("/login"); // redirect to login page
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />



            <button onClick={onLogin}>Login Here</button>
            <Link href="/signup">Visit Singnup Page</Link>
        </div>
    );
}
