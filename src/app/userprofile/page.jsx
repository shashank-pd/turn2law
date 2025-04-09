"use client";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"; // Import the custom hook
import { supabase } from "/lib/supabaseClient"; // Supabase client

export default function UserProfile() {
  const { user, handleLogout } = useAuth(); // Use the custom hook
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {


      if (!user) return;

      const { data, error } = await supabase
  .from("consultations")
  .select(`
    *,
    lawyers (
      name,
      specialization
    )
  `)
  .eq("user_id", user.id);



      if (error) {
        console.error("Error fetching consultations:", error);
      } else {
        console.log("Consultations fetched:", data);
        setConsultations(data);
      }
    };

    fetchConsultations();
  }, [user]);

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

      {/* Booked Consultations */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Booked Consultations</h2>
        {consultations.length === 0 ? (
          <p>No consultations booked yet.</p>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="border border-gray-300 rounded p-4 shadow-sm"
              >
                <p>
                  <strong>Lawyer:</strong>{" "}
                  {consultation.lawyers?.name || "N/A"}{" "}
                  ({consultation.lawyers?.specialization || "N/A"})
                </p>
                <p><strong>Type:</strong> {consultation.consultation_type}</p>
                <p><strong>Time:</strong> {consultation.preferred_time}</p>
                <p><strong>Date:</strong> {new Date(consultation.date).toLocaleDateString()}</p>
                <p><strong>Case:</strong> {consultation.case_description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
