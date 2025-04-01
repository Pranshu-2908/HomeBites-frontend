import DashboardPage from "@/components/DashboardPage";
import React from "react";
import CreateProfile from "./Profile";

function Page() {
  return (
    <DashboardPage title="Chef's Dashboard">
      <CreateProfile />
    </DashboardPage>
  );
}

export default Page;
