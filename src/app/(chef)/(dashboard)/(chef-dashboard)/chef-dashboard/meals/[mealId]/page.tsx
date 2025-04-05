import DashboardPage from "@/components/DashboardPage";
import React from "react";
import EditMealPage from "./UpdateMeal";

function Page() {
  return (
    <DashboardPage title="back to meals" backHref="/chef-dashboard/meals">
      <EditMealPage />
    </DashboardPage>
  );
}

export default Page;
