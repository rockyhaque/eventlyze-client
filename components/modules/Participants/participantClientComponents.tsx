

"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TParticipantUser } from "@/types/participantType";
import { Check, CheckCheckIcon, CrossIcon, Edit, Eye, MoreHorizontal, Search, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../Shared/DateTimeFormat/formatDate";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { updatedParticipatStatus } from "@/services/Participant";
import { toast } from "sonner";

interface TParticipantProps {
    tableType: string
    participants: TParticipantUser[];
}

const ParticipantClientComponents = ({ participants, tableType }: TParticipantProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [allParticipants, setAllParticipants] = useState<TParticipantUser[]>(participants);

    // Search functionality
    const filteredParticipants = allParticipants?.filter((parti) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            parti?.user?.name.toLowerCase().includes(searchLower) ||
            parti?.user?.email.toLowerCase().includes(searchLower) ||
            parti?.event?.title.toLowerCase().includes(searchLower) ||
            parti?.event?.category.toLowerCase().includes(searchLower) ||
            parti?.status.toLowerCase().includes(searchLower)
        );
    });

    const getStatusBadge = (status: TParticipantUser["status"]) => {
        switch (status) {
            case "JOINED":
                return (
                    <Badge
                        variant="outline"
                        className="text-green-500 border-green-500 bg-green-500/10"
                    >
                        JOINED
                    </Badge>
                );
            case "REQUESTED":
                return (
                    <Badge
                        variant="outline"
                        className="text-destructive border-destructive bg-destructive/10"
                    >
                        REQUESTED
                    </Badge>
                );
            case "APPROVED":
                return (
                    <Badge
                        variant="outline"
                        className="text-blue-500 border-blue-500 bg-blue-500/10"
                    >
                        APPROVED
                    </Badge>
                );
            case "REJECTED":
                return (
                    <Badge
                        variant="outline"
                        className="text-yellow-500 border-yellow-500 bg-yellow-500/10"
                    >
                        REJECTED
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

 const handleParticipantApproved = async (id: string) => {
    const res = await updatedParticipatStatus(id, "APPROVED");

    if (res.success) {
        // Optimistically update the participant's status in local state
        setAllParticipants((prev) =>
            prev.map((participant) =>
                participant.id === id ? { ...participant, status: "APPROVED" } : participant
            )
        );
        toast.success("Participant is approved!");
    } else {
        toast.error("Participant approval failed!");
    }
};

const handleParticipantReject = async (id: string) => {
    const res = await updatedParticipatStatus(id, "REJECTED");

    if (res.success) {
        // Optimistically update the participant's status in local state
        setAllParticipants((prev) =>
            prev.map((participant) =>
                participant.id === id ? { ...participant, status: "REJECTED" } : participant
            )
        );
        toast.success("Participant is rejected!");
    } else {
        toast.error("Participant rejection failed!");
    }
};

    return (
        <div>
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search participants..."
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
                            <TableHeader>
                                <TableRow>
                                    {
                                        tableType == "request" && <TableHead>Requested User</TableHead>
                                    }
                                    <TableHead>Event Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    {
                                        tableType == "participation" && <TableHead>Requested On</TableHead>
                                    }
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredParticipants?.length > 0 ? (
                                    filteredParticipants?.map((parti) => (
                                        <TableRow key={parti.id}>

                                            {
                                                tableType == "request" && <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>{parti.user?.name?.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">
                                                                {parti.user?.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {parti.user?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            }

                                            <TableCell
                                                className="max-w-[150px] truncate"
                                                title={parti.event?.title}
                                            >
                                                {parti.event?.title || "Fallback Title"}
                                            </TableCell>

                                            <TableCell>
                                                {getStatusBadge(parti.status)}
                                            </TableCell>
                                            {
                                                tableType == "participation" && <TableCell>
                                                    {formatDate(parti.createdAt)} at {formatDate(parti.createdAt, "h:mm A")}
                                                </TableCell>
                                            }

                                            {
                                                tableType == "participation" && <TableCell className="text-center items-center justify-center flex">
                                                    <Link href={`/events/${parti?.eventId}`}>
                                                        <Button
                                                            variant="ghost"
                                                            className=" rounded-full just"
                                                        >
                                                            <Eye />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            }
                                            {
                                                tableType == "request" && <TableCell className="text-right">
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
                                                            <DropdownMenuItem className="text-green-500" onClick={() => handleParticipantApproved(parti.id)}>
                                                                <Check className="mr-2 h-4 w-4" />

                                                                Approved User

                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-500" onClick={() => handleParticipantReject(parti.id)}>
                                                                <X className="mr-2 h-4 w-4" />
                                                                Reject User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            }


                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                                                <div className="text-4xl">🎉</div>
                                                <h3 className="mt-4 text-lg font-medium text-white">No Participants</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    You haven't joined any events.
                                                </p>
                                            </div>
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

export default ParticipantClientComponents;