"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import Link from "next/link";
import React, { useState } from "react";
import { login, updateUserLocation } from "@/redux/slices/authSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { useSocket } from "@/utils/SocketContext";
import { useAppDispatch } from "@/redux/hooks";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { socket } = useSocket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
        role,
      });
      dispatch(login(response.data.user));
      toast(response.data.message);
      if (socket) {
        socket.emit("register", response.data.user._id);
      }

      // Redirect based on user role
      if (response.data.user.role === "chef") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              dispatch(updateUserLocation({ latitude, longitude }));
            },
            (error) => {
              toast.error(`${error}`);
            }
          );
        }
        router.replace("/chef-onboarding");
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              dispatch(updateUserLocation({ latitude, longitude }));
            },
            (error) => {
              toast.error(`${error}`);
            }
          );
        }
        router.replace("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      toast("Sign up failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center mt-25 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Your Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="mb-6">
          <Label className="text-lg block mb-2">Sign up as:</Label>
          <RadioGroup
            defaultValue={role}
            onValueChange={setRole}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="chef"
                checked={role === "chef"}
                onChange={() => setRole("chef")}
              />
              <Label className="text-md sm:text-lg">Chef</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="customer"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
              />
              <Label className="text-md sm:text-lg">Customer</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="relative mb-5">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            className="pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="relative mb-5">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative mb-5">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="relative mb-5">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            className="pl-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {loading ? (
          <Button
            type="button"
            disabled
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-700 text-white cursor-pointer"
          >
            Sign Up
          </Button>
        )}
        <p className="mt-5 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link className="text-blue-600 hover:underline" href="/login">
            Login here
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Signup;
