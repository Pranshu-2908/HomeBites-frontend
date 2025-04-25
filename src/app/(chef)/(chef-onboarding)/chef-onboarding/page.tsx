"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import StepTimeline from "./StepTimeline";
import ProfileForm from "./ProfileForm";
import AddMealForm from "./AddMealForm";
import Completion from "./Completion";
import { axiosInstance } from "@/utils/axiosInstance";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store: RootState) => store.auth);
  const step = user?.onBoardingSteps;

  const handleLogout = async () => {
    const resp = await axiosInstance.get("/user/logout", {
      withCredentials: true,
    });
    dispatch(logout());
    router.push("/");
    toast(resp.data.message);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center w-full">
          Welcome, Chef! Let’s get you started 🍽️
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute right-0 top-4 p-2 border border-gray-400 bg-gray-200 text-white rounded hover:bg-gray-300 transition"
        >
          <LogOut className="text-black w-4 h-4" />
        </button>
      </div>

      <StepTimeline currentStep={step ?? 0} />

      <div className="mt-10">
        {step === 0 && <ProfileForm />}
        {step === 1 && <AddMealForm />}
        {step === 2 && <Completion />}
      </div>
    </div>
  );
}
