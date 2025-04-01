import DashboardPage from "@/components/DashboardPage";
import React from "react";
import ViewOrders from "./ViewOrders";

function Page() {
  return (
    <DashboardPage title="Chef's Dashboard">
      <ViewOrders />
    </DashboardPage>
  );
}

export default Page;
