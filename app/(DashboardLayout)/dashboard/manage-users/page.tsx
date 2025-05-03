"use client"

import { useEffect, useState } from "react"
import { UserTable } from "@/components/user-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"
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
  role: "ADMIN" | "ORGANIZER" | "ATTENDEE" | "USER"
  gender: "MALE" | "FEMALE" | "OTHER" | null 
  photo: string | null
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" 
  createdAt: string
  updatedAt: string
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOpenDialog = (user?: any) => {
    setEditingUser(user || null)
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
          <Button
            onClick={() => handleOpenDialog()}
            className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

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


        {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <UserTable searchQuery={searchQuery} roleFilter={roleFilter} onEdit={handleOpenDialog} users={users} />
      )}

        <UserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={editingUser} onClose={handleCloseDialog} />
      </div>
    </>
  )
}
