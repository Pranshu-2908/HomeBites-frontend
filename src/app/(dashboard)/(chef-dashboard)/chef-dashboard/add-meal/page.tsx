import DashboardPage from "@/components/DashboardPage";
import React from "react";
import AddMeal from "./AddMeal";

function Page() {
  return (
    <DashboardPage title="back to dashboard">
      <AddMeal />
    </DashboardPage>
  );
}

export default Page;
