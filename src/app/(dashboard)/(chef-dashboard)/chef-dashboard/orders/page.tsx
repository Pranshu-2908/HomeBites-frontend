import DashboardPage from "@/components/DashboardPage";
import React from "react";
import ViewOrders from "./ViewOrders";

function Page() {
  return (
    <DashboardPage title="back to dashboard">
      <ViewOrders />
    </DashboardPage>
  );
}

export default Page;
