"use client"

import PaymentCancelled from "@/components/modules/Payment/PaymentCancelled";
import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default  function PaymentStatus() {
  const params = useParams();
  const id = params.id

  console.log(id)


  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.warn("No transaction ID found in query parameters.");
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/payments/${id}`
        );

        if (!res.ok) {
          throw new Error(
            "Payment status fetch failed with status " + res.status
          );
        }

        const data = await res.json();

        console.log("Payment verification response:", data);

        // Example: assuming your backend returns { success: true, data: {...} }

        setPaymentDetails(data.data || null);
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [id]);

  return (
    <div className="my-14 text-center">
      {loading ? (
        <div className="flex justify-center items-center gap-2 text-blue-500">
          <Loader2 className="animate-spin" /> Verifying your payment...
        </div>
      ) : paymentDetails ? (
        <PaymentSuccess paymentDetails={paymentDetails} />
      ) : (
        <PaymentCancelled />
      )}

      {/* <p>hello payment</p> */}
    </div>
  );
}
