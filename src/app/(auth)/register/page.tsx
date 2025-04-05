"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
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

      // Redirect based on user role
      if (response.data.user.role === "chef") {
        router.push("/chef-dashboard");
      } else {
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast("Sign up failed!");
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto bg-linear-to-b from-purple-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="sm:w-1/3 border border-gray-300 rounded-2xl p-4 my-10"
      >
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="my-5">
          <Label className="text-lg">Signup as</Label>
          <RadioGroup
            defaultValue={role}
            onValueChange={setRole}
            className="flex gap-6 justify-start ml-5"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="chef"
                checked={role === "chef"}
                onChange={() => setRole("chef")}
                className="cursor-pointer"
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
                className="cursor-pointer"
              />
              <Label className="text-md sm:text-lg">Customer</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="my-5">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="my-5">
          <Input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        <span className="mt-5 flex gap-2 justify-center">
          Already registered?
          <Link className="text-slate-600 hover:text-blue-600" href="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
