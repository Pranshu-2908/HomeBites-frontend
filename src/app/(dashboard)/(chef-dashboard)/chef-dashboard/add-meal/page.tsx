import DashboardPage from "@/components/DashboardPage";
import React from "react";
import AddMeal from "./AddMeal";

function Page() {
  return (
    <DashboardPage title="Chef's Dashboard">
      <AddMeal />
    </DashboardPage>
  );
}

export default Page;
