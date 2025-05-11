"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Eye,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { TPayment } from "@/types/paymentTypes";
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate";
import Link from "next/link";


type TPaymentsParams = {
  payments: TPayment[];
};

export function DashboardPayments({ payments }: TPaymentsParams) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock payment data
  // const paymentsData: Payment[] = [
  //   {
  //     id: "1",
  //     transactionId: "TXN-78945612",
  //     customer: "John Smith",
  //     event: "Tech Conference 2023",
  //     amount: 299.99,
  //     date: "2023-05-15T10:30:00",
  //     status: "completed",
  //     method: "credit_card",
  //   },
  //   {
  //     id: "2",
  //     transactionId: "TXN-45678912",
  //     customer: "Emily Johnson",
  //     event: "Music Festival",
  //     amount: 149.5,
  //     date: "2023-05-14T14:45:00",
  //     status: "completed",
  //     method: "paypal",
  //   },
  //   {
  //     id: "3",
  //     transactionId: "TXN-12345678",
  //     customer: "Michael Brown",
  //     event: "Business Workshop",
  //     amount: 79.99,
  //     date: "2023-05-13T09:15:00",
  //     status: "pending",
  //     method: "bank_transfer",
  //   },
  //   {
  //     id: "4",
  //     transactionId: "TXN-98765432",
  //     customer: "Sarah Wilson",
  //     event: "Design Summit",
  //     amount: 199.99,
  //     date: "2023-05-12T16:20:00",
  //     status: "failed",
  //     method: "credit_card",
  //   },
  //   {
  //     id: "5",
  //     transactionId: "TXN-45612378",
  //     customer: "David Miller",
  //     event: "Networking Mixer",
  //     amount: 49.99,
  //     date: "2023-05-11T18:30:00",
  //     status: "refunded",
  //     method: "apple_pay",
  //   },
  //   {
  //     id: "6",
  //     transactionId: "TXN-78912345",
  //     customer: "Jennifer Lee",
  //     event: "Photography Workshop",
  //     amount: 129.99,
  //     date: "2023-05-10T11:00:00",
  //     status: "completed",
  //     method: "google_pay",
  //   },
  //   {
  //     id: "7",
  //     transactionId: "TXN-32165498",
  //     customer: "Robert Taylor",
  //     event: "Cooking Class",
  //     amount: 89.99,
  //     date: "2023-05-09T15:45:00",
  //     status: "completed",
  //     method: "credit_card",
  //   },
  //   {
  //     id: "8",
  //     transactionId: "TXN-65432198",
  //     customer: "Lisa Anderson",
  //     event: "Yoga Retreat",
  //     amount: 249.99,
  //     date: "2023-05-08T08:30:00",
  //     status: "pending",
  //     method: "paypal",
  //   },
  // ]

  // Filter payments based on search query and status filter
  // const filteredPayments = payments.filter((payment) => {
  //   const matchesSearch =
  //     payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     payment.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())

  //   const matchesStatus = statusFilter === "all" || payment.status === statusFilter

  //   return matchesSearch && matchesStatus
  // })

  // Pagination
  // const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  // const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Format date
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString)
  //   return new Intl.DateTimeFormat("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }).format(date)
  // }

  // Format currency
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   }).format(amount)
  // }

  // Get status badge
  const getStatusBadge = (status: TPayment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return (
          <Badge
            variant="outline"
            className="text-green-500 border-green-500 bg-green-500/10"
          >
            SUCCESS
          </Badge>
        );
      case "FAILED":
        return (
          <Badge
            variant="outline"
            className="text-destructive border-destructive bg-destructive/10"
          >
            FAILED
          </Badge>
        );
      case "CANCEL":
        return (
          <Badge
            variant="outline"
            className="text-blue-500 border-blue-500 bg-blue-500/10"
          >
            FAILED
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>
              Track and manage your event payments
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-md w-full sm:w-[200px]"
              />
            </div>
            {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-md w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select> */}
            <Button variant="outline" size="icon" className="rounded-md">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No payments found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell className="font-mono text-xs">
                      {payment?.paymentId}
                    </TableCell>
                    <TableCell>{payment?.user?.name}</TableCell>
                    <TableCell
                      className="max-w-[150px] truncate"
                      title={payment?.eventId}
                    >
                      {payment?.event?.title}
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment?.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {" "}
                      {formatDate(payment?.createdAt)}:
                      {formatDate(payment?.createdAt, "h:mm A")}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment?.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <Link   href={`/events/${payment?.eventId}`}>
                            View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download Receipt</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                            {/* <Button size="lg">
                        <Download className="mr-2 h-4" />
                       Download Receipt
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
