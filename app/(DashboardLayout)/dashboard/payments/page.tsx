export const dynamic = "force-dynamic";
import { DashboardPayments } from "@/components/dashboard-payments";
import { getAllPayments } from "@/services/PaymentsServices";

const DashboardPaymentPage = async () => {
  const res = await getAllPayments();
  const payments = res?.data;

  return (
    <div>
      <DashboardPayments payments={payments} />
    </div>
  );
};

export default DashboardPaymentPage;
