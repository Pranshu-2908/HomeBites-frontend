"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
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
        router.push("/chef-dashboard");
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
    <div className="flex items-center justify-center mx-auto bg-linear-to-b from-purple-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-2xl p-4 my-10"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-5">Login</h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="my-5">
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="my-5">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {loading ? (
          <Button
            type="button"
            className="cursor-pointer bg-slate-900 hover:bg-slate-600 w-full"
          >
            <Loader2 className="text-white animate-spin w-6 h-6" />
            Submiting...
          </Button>
        ) : (
          <Button
            type="submit"
            className="cursor-pointer bg-slate-900 hover:bg-slate-600 w-full"
          >
            Submit
          </Button>
        )}

        <div className="mt-5 flex gap-2 justify-center">
          New to DreamHomes?
          <Link className="text-slate-600 hover:text-blue-600" href="/register">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
