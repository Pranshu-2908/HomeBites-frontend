import DashboardPage from "@/components/DashboardPage";
import React from "react";
import OrderHistory from "./OrderHistory";

function Page() {
  return (
    <DashboardPage title="Chef's Dashboard">
      <OrderHistory />
    </DashboardPage>
  );
}

export default Page;
