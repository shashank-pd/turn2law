"use client";

import { useState } from "react";
import LawyerCard from "../../components/LawyerCard";
import { supabase } from "/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

export default function ConsultPage() {
  const [practiceArea, setPracticeArea] = useState("");
  const [recommendedLawyers, setRecommendedLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [hasSelectedArea, setHasSelectedArea] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selected, setSelected] = useState("");
  const { user } = useAuth();

  const disablePastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const findRecommendedLawyers = async (area) => {
    if (!area) return setRecommendedLawyers([]);
    const { data, error } = await supabase
      .from("lawyers")
      .select("*")
      .eq("specialization", area);
    if (error) return console.error("Supabase error:", error.message);
    setRecommendedLawyers(data);
  };

  const handleChange = async (e) => {
    const selectedValue = e.target.value;
    setPracticeArea(selectedValue);
    setHasSelectedArea(true);
    await findRecommendedLawyers(selectedValue);
  };

  // ✅ Final submission logic — runs after all validation is passed
  const onSubmit = async (formData) => {
    try {
      const { error } = await supabase.from("consultations").insert([
        {
          user_id: user.id,
          lawyer_id: selectedLawyer,
          consultation_type: formData.consultationType,
          case_description: formData.caseDescription,
          preferred_time: formData.preferredTime,
          date: selected.toISOString(),
        },
      ]);

      if (error) {
        toast.error("Failed to schedule consultation.");
        console.error(error);
        return;
      }

      toast.success("Consultation scheduled successfully!");
      reset(); 
      setSelectedLawyer(null);
      setSelected(undefined);
      setPracticeArea("")

    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  // ✅ Custom logic before validation (auth + selections)
  const customSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to schedule a consultation.");
      return;
    }

    if (!selectedLawyer) {
      toast.error("Please select a lawyer.");
      return;
    }

    if (!selected) {
      toast.error("Please select a preferred date.");
      return;
    }

    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-12">
      <h1 className="text-xl font-bold tracking-tight sm:text-6xl mb-12 text-center">
        Consult a Lawyer
      </h1>

      <form onSubmit={customSubmit} className="mb-6">
        <div className="flex justify-between">
          <div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Select Practice Area:</label>
              <select
                value={practiceArea}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-96"
              >
                <option value="">-- Choose an area --</option>
                <option value="property">Property Law</option>
                <option value="immigration">Immigration Law</option>
                <option value="criminal">Criminal Law</option>
                <option value="corporate">Corporate Law</option>
                <option value="family">Family Law</option>
              </select>
              {errors.practiceArea && (
                <span className="text-red-500 text-sm">Please select a practice area</span>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Case Description:</label>
              <textarea
                placeholder="Provide details about your legal matter..."
                {...register("caseDescription", { required: true })}
                className="min-h-[120px] w-full p-2 border rounded"
              />
              {errors.caseDescription && (
                <span className="text-red-500 text-sm">Case description is required</span>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Consultation Type:</label>
              <select
                {...register("consultationType", { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Choose consultation type --</option>
                <option value="virtual">Virtual Consultation</option>
                <option value="in-person">In-person Consultation</option>
              </select>
              {errors.consultationType && (
                <span className="text-red-500 text-sm">Select consultation type</span>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Preferred Time:</label>
              <select
                {...register("preferredTime", { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select time --</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
              </select>
              {errors.preferredTime && (
                <span className="text-red-500 text-sm">Select preferred time</span>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Preferred Date:</label>
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg max-w-md">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={
                  <div className="text-sm font-medium text-gray-700">
                    {selected
                      ? `Selected: ${selected.toLocaleDateString()}`
                      : "Pick a day."}
                  </div>
                }
                className="rounded-lg border-2 border-blue-500 p-3"
                disabled={disablePastDates}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          {hasSelectedArea && recommendedLawyers.length === 0 ? (
            <p>No lawyers found for this area.</p>
          ) : (
            hasSelectedArea && (
              <>
                <h1 className="text-xl font-bold tracking-tight sm:text-3xl text-center">
                  Choose a Lawyer
                </h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {recommendedLawyers.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      onClick={() => setSelectedLawyer(lawyer.id)}
                      selected={selectedLawyer === lawyer.id}
                    />
                  ))}
                </div>
              </>
            )
          )}
        </div>

        <div className="mt-8 text-center">
          <button type="submit" className="p-2 text-white rounded w-full bg-black">
            Schedule Consultation
          </button>
        </div>
      </form>
    </div>
  );
}
