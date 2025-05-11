"use client"
export const dynamic = "force-dynamic"; 
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IUser } from "@/app/(DashboardLayout)/dashboard/manage-users/page"
import { updatedUserStatus, updatedUserRole } from "@/services/UserServices"
import { toast } from "sonner"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: IUser
  action: "status" | "role" | null
  onClose: () => void
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export function UserDialog({ open, onOpenChange, user, onClose, action, setUsers }: UserDialogProps) {

  const [status, setStatus] = useState("ACTIVE")
  const [role, setRole] = useState("USER")
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (user) {
      setStatus(user.status || "ACTIVE")
      setRole(user.role || "USER")
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      if (action === "status") {
        await updatedUserStatus(user.id, status)
        toast.success(`User status updated to "${status}".`)
        setUsers((prev) =>
          prev.map((singleUser) =>
            singleUser.id === user.id
              ? {
                  ...singleUser,
                  status: (status?.toUpperCase() as IUser["status"]) || singleUser.status
                }
              : singleUser
          )
        )
        
      } else if (action === "role") {
        await updatedUserRole(user.id, role)
        toast.success(`User role updated to "${role}".`)
        setUsers((prev) =>
          prev.map((singleUser) =>
            singleUser.id === user.id
              ? {
                  ...singleUser,
                  role: (role?.toUpperCase() as IUser["role"]) || singleUser?.role
                }
              : singleUser
          )
        )
      }
      onClose()
    } catch (error) {
      toast.error("There was a problem updating the user.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Update user {action === "status" ? "status" : "role"}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={user?.name || ""} disabled />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} disabled />
            </div>

            {action === "role" && (
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="rounded-md">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {action === "status" && (
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="rounded-md">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="BLOCKED">Blocked</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
