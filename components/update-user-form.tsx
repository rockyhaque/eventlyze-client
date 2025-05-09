"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import useImageUploader from "@/components/utils/useImageUploader"
import { updatedUser } from "@/services/UserServices"
import { toast } from "sonner"
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
import { useState } from "react"
const UpdateUserForm = ({user}:any) => {
    const { uploadImagesToCloudinary, isUploading } = useImageUploader()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)


      const {
        register: registerGeneral,
        handleSubmit: handleSubmitGeneral,
        setValue,
      } = useForm({
        defaultValues: {
          name: user?.name || "",
          email: user?.email || "",
          contactNumber: user?.contactNumber || "",
          gender:user?.gender || "MALE",
          photo: user?.photo || "",
        },
      })




  const onGeneralSubmit = async (data: any) => {
    let uploadedPhotoUrl = data.photo

    if (selectedImage) {
      uploadedPhotoUrl = await uploadImagesToCloudinary(selectedImage, false)
    }
    const userImage = user?.photo || uploadedPhotoUrl
    const finalData = {
      ...data,
      photo: userImage,
    }

    console.log("User Info:", finalData)

    const response = await updatedUser(finalData)
    if(response.success){
      toast.success("Profile Updated Successfully!")
    }else{
      toast.error("Profile Updated Failed!")
    }

  }
  return (
    <div>
          {/* General Info Form */}
      <form onSubmit={handleSubmitGeneral(onGeneralSubmit)}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your profile info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...registerGeneral("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input disabled id="email" type="email" {...registerGeneral("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" {...registerGeneral("contactNumber")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                defaultValue="MALE"
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>

    </div>
  )
}

export default UpdateUserForm