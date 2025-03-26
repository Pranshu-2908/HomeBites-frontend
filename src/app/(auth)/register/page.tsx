import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center mx-auto bg-linear-to-b from-purple-50 to-white">
      <form className=" sm:w-1/3 border border-gray-300 rounded-2xl p-4 my-10">
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <div className="my-5">
          <Label className="text-lg">Signup as</Label>
          <RadioGroup
            defaultValue="tenant"
            className="flex gap-6 justify-start ml-5"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="tenant"
                className="cursor-pointer"
              />
              <Label className="text-md sm:text-lg">Chef</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="landlord"
                className="cursor-pointer"
              />
              <Label className="text-md sm:text-lg">Customer</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="my-5">
          <Input type="text" name="name" placeholder="Full Name" />
        </div>
        <div className="my-5">
          <Input type="email" name="email" placeholder="E-mail" />
        </div>

        <div className="my-5">
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <div className="my-5">
          <Input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer bg-slate-900 hover:bg-slate-600 w-full"
        >
          Submit
        </Button>

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

export default page;
