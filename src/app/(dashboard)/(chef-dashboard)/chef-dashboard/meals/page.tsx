import DashboardPage from "@/components/DashboardPage";
import React from "react";
import ViewMeals from "./ViewMeals";

function Page() {
  return (
    <DashboardPage title="back to dashboard">
      <ViewMeals />
    </DashboardPage>
  );
}

export default Page;
