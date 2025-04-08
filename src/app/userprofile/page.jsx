"use client";

import useAuth from "../../hooks/useAuth"; // Import the custom hook

export default function UserProfile() {
  const { user, handleLogout } = useAuth(); // Use the custom hook

  if (!user) {
    return <p className="mt-20">No user found. Please log in.</p>;
  }

  const username = user?.user_metadata?.username || user.email;

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-500 text-white rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
