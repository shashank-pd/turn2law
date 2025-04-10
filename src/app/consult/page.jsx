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
      setPracticeArea("");

    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

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
    <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-6xl mx-auto mt-13">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">
        Consult a Lawyer
      </h1>

      <form onSubmit={customSubmit} className="space-y-6">
        {/* Responsive Flexbox for Form + Calendar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side form */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Select Practice Area:</label>
              <select
                value={practiceArea}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
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

            <div>
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

            <div>
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

            <div>
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

          {/* Calendar (Right) */}
          <div className="w-full lg:w-[360px]">
            <label className="block mb-2 font-medium">Preferred Date:</label>
            <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-md">
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
                className="rounded-lg"
                disabled={disablePastDates}
              />
            </div>
          </div>
        </div>

        {/* Lawyer Recommendations */}
        <div className="mt-10">
          {hasSelectedArea && recommendedLawyers.length === 0 ? (
            <p className="text-center text-gray-600">No lawyers found for this area.</p>
          ) : (
            hasSelectedArea && (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Choose a Lawyer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button type="submit" className="lg:w-full sm:w-auto bg-black text-white px-6 py-3 rounded hover:bg-gray-900">
            Schedule Consultation
          </button>
        </div>
      </form>
    </div>
  );
}
