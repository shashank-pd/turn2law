"use client";

import { useState } from "react";
import LawyerCard from "../../components/LawyerCard";
import { supabase } from "/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function ConsultPage() {
    const [practiceArea, setPracticeArea] = useState("");
    const [recommendedLawyers, setRecommendedLawyers] = useState([]);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [hasSelectedArea, setHasSelectedArea] = useState(false);
    const [preferredTime, setPreferredTime] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selected, setSelected] = useState("");

    const disablePastDates = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part
        return date < today; // Disable dates before today
    };


    // Fetch recommended lawyers based on the selected practice area
    const findRecommendedLawyers = async (area) => {
        if (!area) {
            setRecommendedLawyers([]);
            return;
        }
        const { data, error } = await supabase
            .from("lawyers")
            .select("*")
            .eq("specialization", area);

        if (error) {
            console.error("Supabase error:", error.message);
            return;
        }

        setRecommendedLawyers(data);
    };

    const handleChange = async (e) => {
        const selectedValue = e.target.value;
        setPracticeArea(selectedValue);
        setHasSelectedArea(true); // Mark that an area is selected
        await findRecommendedLawyers(selectedValue);
    };

    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        // You can trigger your toast notifications here if needed
    };

    return (
        <div className="p-6 max-w-4xl mx-auto mt-12" >
            <h1 className="text-2xl font-bold mb-4">Find a Lawyer</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                {/* Select Practice Area */}
                <div className="flex justify-between ">
                    <div>
                        <div>
                            <label htmlFor="practice-area" className="block mb-2 font-medium">
                                Select Practice Area:
                            </label>
                            <select
                                id="practice-area"
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
                            {errors.practiceArea && <span className="text-red-500 text-sm">Please select a practice area</span>}
                        </div>

                        {/* Case Description */}
                        <div>
                            <label htmlFor="case-description" className="block mb-2 font-medium">
                                Case Description:
                            </label>
                            <textarea
                                id="case-description"
                                placeholder="Please provide details about your legal matter..."
                                {...register("caseDescription", { required: true })}
                                className="min-h-[120px] w-full p-2 border rounded"
                            />
                            {errors.caseDescription && <span className="text-red-500 text-sm">Case description is required</span>}
                        </div>

                        {/* Consultation Type */}
                        <div>
                            <label htmlFor="consultation-type" className="block mb-2 font-medium">
                                Consultation Type:
                            </label>
                            <select
                                id="consultation-type"
                                {...register("consultationType", { required: true })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">-- Choose consultation type --</option>
                                <option value="virtual">Virtual Consultation</option>
                                <option value="in-person">In-person Consultation</option>
                            </select>
                            {errors.consultationType && <span className="text-red-500 text-sm">Please select consultation type</span>}
                        </div>
                    </div>

                    <div>
                        {/* Preferred Time */}
                        <div>
                            <label htmlFor="preferred-time" className="block mb-2 font-medium">
                                Preferred Time:
                            </label>
                            <select
                                id="preferred-time"
                                value={preferredTime}
                                onChange={(e) => setPreferredTime(e.target.value)}
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
                            {errors.preferredTime && <span className="text-red-500 text-sm">Please select preferred time</span>}
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="date" className="block mb-2 font-medium">
                                Preferred Date:
                            </label>
                            <div className="p-6 mx-auto bg-white rounded-lg border-2 border-gray-300 shadow-lg max-w-md flex justify-center items-center">
                                <DayPicker
                                    mode="single"
                                    selected={selected}
                                    onSelect={setSelected}
                                    footer={
                                        selected ? (
                                            <div className="text-sm font-medium text-gray-700">{`Selected: ${selected.toLocaleDateString()}`}</div>
                                        ) : (
                                            <div className="text-sm font-medium text-gray-500">Pick a day.</div>
                                        )
                                    }
                                    className="rounded-lg border-2 border-blue-500 hover:border-blue-700 focus:ring-2 focus:ring-blue-400 shadow-sm p-3"
                                    disabled={disablePastDates}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                    {hasSelectedArea && recommendedLawyers.length === 0 ? (
                        <p>No lawyers found for this area.</p>
                    ) : (
                        recommendedLawyers.map((lawyer) => (
                            <LawyerCard
                                key={lawyer.id}
                                lawyer={lawyer}
                                onClick={() => setSelectedLawyer(lawyer.id)}
                                selected={selectedLawyer === lawyer.id}
                            />
                        ))
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
