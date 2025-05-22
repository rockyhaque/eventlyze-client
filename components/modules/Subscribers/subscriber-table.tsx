
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSubscriber } from "@/types/subscriberType";
import { Search } from "lucide-react";
import { formatDate } from "../Shared/DateTimeFormat/formatDate";
import { useState } from "react";

export interface TSub {
    subscribers: TSubscriber[];
}

const Subscribertable = ({ subscribers }: TSub) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter subscribers based on search query
    const filteredSubscribers = subscribers?.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Subscriber</CardTitle>
                            <CardDescription>
                                View and manage all your subscribers
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by email"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-md w-full sm:w-[200px]"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="bg-blue-950">
                                <TableRow>
                                    <TableHead>Subscriber ID</TableHead>
                                    <TableHead>Subscriber Email</TableHead>
                                    <TableHead>Subscribe Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubscribers?.length > 0 ? (
                                    filteredSubscribers.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-mono text-xs">
                                                {sub.id}
                                            </TableCell>
                                            <TableCell>{sub.email}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(sub.createdAt)}:
                                                {formatDate(sub.createdAt, "h:mm A")}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="text-center py-8 text-muted-foreground min-h-[50vh]"
                                        >
                                            {searchQuery ?
                                                "No subscribers match your search" :
                                                "No subscribers found"
                                            }
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Subscribertable;