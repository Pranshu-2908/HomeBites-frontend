import DashboardPage from "@/components/DashboardPage";
import React from "react";
import CreateProfile from "./Profile";

function Page() {
  return (
    <DashboardPage title="back to dashboard">
      <CreateProfile />
    </DashboardPage>
  );
}

export default Page;
