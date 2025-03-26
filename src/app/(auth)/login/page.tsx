import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center mx-auto bg-linear-to-b from-purple-50 to-white">
      <form className="border border-gray-300 rounded-2xl p-4 my-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-5">Login</h1>

        <div className="my-5">
          <Input type="email" name="email" placeholder="E-mail" />
        </div>

        <div className="my-5">
          <Input type="password" placeholder="Password" name="password" />
        </div>

        <Button
          type="submit"
          className="cursor-pointer bg-slate-900 hover:bg-slate-600 w-full"
        >
          Submit
        </Button>

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

export default page;
