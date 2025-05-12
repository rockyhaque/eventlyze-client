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

interface TPaymentsParams {
  payments: any[]
}

export function DashboardPayments({ payments }: TPaymentsParams) {
  const [searchQuery, setSearchQuery] = useState("");
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
              {!payments || payments?.length < 1 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground min-h-[50vh]"
                  >
                    No payments found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                payments?.map((payment: TPayment) => (
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      </CardContent>
    </Card>
  );
}
