import PaymentSuccessPage from "@/components/PaymentSuccess";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default page;
