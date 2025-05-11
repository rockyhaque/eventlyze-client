export interface TPayment {
  paymentId: string;
  eventId: string;
  userId: string;
  paymentUrl: string;
  transactionId: string | null;
  status: 'CANCEL' | 'SUCCESS' | 'FAILED';
  amount: number;
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    photo: string | null;
  };
}
