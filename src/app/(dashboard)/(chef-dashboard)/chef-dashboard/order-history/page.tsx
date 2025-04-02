import DashboardPage from "@/components/DashboardPage";
import React from "react";
import OrderHistory from "./OrderHistory";

function Page() {
  return (
    <DashboardPage title="back to dashboard">
      <OrderHistory />
    </DashboardPage>
  );
}

export default Page;
