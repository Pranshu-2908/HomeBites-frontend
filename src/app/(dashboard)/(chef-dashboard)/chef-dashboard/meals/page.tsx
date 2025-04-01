import DashboardPage from "@/components/DashboardPage";
import React from "react";
import ViewMeals from "./ViewMeals";

function Page() {
  return (
    <DashboardPage title="Chef's Dashboard">
      <ViewMeals />
    </DashboardPage>
  );
}

export default Page;
