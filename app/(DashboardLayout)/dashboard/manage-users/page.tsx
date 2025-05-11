"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react"
import { UserTable } from "@/components/user-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserDialog } from "@/components/user-dialog"
import { getAllUser } from "@/services/UserServices"
export interface IUser {
  id: string
  name: string | null
  email: string
  password: string
  needPasswordChange: boolean
  contactNumber: string | null
  role: "ADMIN" | "USER"
  gender: "MALE" | "FEMALE" | "OTHER" | null
  photo: string | null
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED"
  createdAt: string
  updatedAt: string
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [action, setAction] = useState<"status" | "role" | null>(null)
  const handleOpenDialog = (user?: IUser, actionType?: "status" | "role" | null) => {
    setEditingUser(user || null)
    setAction(actionType || null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      try {
        const result = await getAllUser()
        setUsers(result.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUsers()
  }, [])

  return (
    <>
       <div className="flex-1">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts, permissions, and access levels.</p>
          </div>
        </div>

        {isLoading ? (
          <UserTableSkeleton />
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-md"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-[180px] rounded-md">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="organizer">Organizer</SelectItem>
                  <SelectItem value="attendee">Attendee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <UserTable searchQuery={searchQuery} roleFilter={roleFilter} onEdit={handleOpenDialog} users={users} setUsers={setUsers} />
          </>
        )}

        <UserDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          user={editingUser}
          action={action}
          onClose={handleCloseDialog}
          setUsers={setUsers}
        />
      </div> 
    </>
  )
}




function UserTableSkeleton() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-1/3" /> {/* Search */}
        <Skeleton className="h-10 w-24" /> {/* Filter dropdown */}
      </div>

      <div className="w-full border rounded-lg divide-y divide-muted bg-background text-sm">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 items-center gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-6 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
