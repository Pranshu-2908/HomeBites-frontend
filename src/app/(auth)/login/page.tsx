"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { login } from "@/redux/slices/authSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      if (response.data) {
        dispatch(login(response.data.user));
        toast(response.data.message);
      }
      // Redirect based on user role
      if (response.data.user.role === "chef") {
        router.replace("/chef-dashboard");
      } else {
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast(err.response?.data?.message);
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          {loading ? (
            <Button
              disabled
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white transition"
            >
              Login
            </Button>
          )}
        </div>
        <p className="mt-5 text-center text-sm text-gray-600">
          New to HomeBites?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
