"use client"
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { changePassword } from '@/services/AuthServices'
const UpdatePasswordForm = () => {
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })


  const onPasswordSubmit =async (data: any) => {
    console.log("Password Info:", data)
    const finalData = {
      "oldPassword": data.currentPassword,
      "newPassword": data.newPassword
    }

    if (!data.confirmPassword == data.newPassword) {
      toast.error("Confirm Password is not matching!!")
    }

    const response = await changePassword(finalData)
    if (response.success) {
      toast.success("Password Updated Successfully!")
    } else {
      toast.error("Password Updated Failed!")
    }
  }

  return (
    <div>

      {/* Password Form */}
      <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                {...registerPassword("currentPassword")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                {...registerPassword("newPassword")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...registerPassword("confirmPassword")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Change Password</Button>
          </CardFooter>
        </Card>
      </form>

    </div>
  )
}

export default UpdatePasswordForm