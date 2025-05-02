"use client";

import { useState } from "react";

import { Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { Form } from "@/components/ui/form";
import useImageUploader from "@/components/utils/useImageUploader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import EFormInput from "@/components/modules/Shared/Form/EFormInput";
import EFormTextarea from "@/components/modules/Shared/Form/EFtextArea";
import EFormImageUpload from "@/components/modules/Shared/Form/EFormImageUpload";
import EFormSelect from "@/components/modules/Shared/Form/EFormSelectMultiple";
import EFormDateInput from "@/components/modules/Shared/Form/EFormDateInput";
import EFormTimeInput from "@/components/modules/Shared/Form/EFormTimeInput";
import {
  categoryOptions,
  eventTypeOptions,
  tabs,
} from "@/components/modules/Dashboard/CreateEvent/eventSelectOptions";
import EFormCheckbox from "@/components/modules/Shared/Form/EFormCheckbox";
import { createEvent } from "@/services/EventServices";

export default function CreateEventPage() {
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();

  const form = useForm();
  // const form = useForm({
  //   resolver:zodResolver(eventSchema)
  // });
  const {
    watch,
    formState: { isSubmitting },
  } = form;

  const eventType = watch("eventType");

  const isOffline = eventType === "OFFLINE";
  const isOnline = eventType === "ONLINE";

  const [eventImageUrl, setEventImageUrl] = useState<File | File[]>([]);

  const [activeTab, setActiveTab] = useState("details");

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Upload the image and get the URL
      const uploadedImageUrl = await uploadImagesToCloudinary(
        eventImageUrl,
        false
      );

      const formData = {
        ...data,
        eventBanner: uploadedImageUrl,

        registrationStart: `${data.registrationStartDate}:${data.registrationStartTime}`,
        registrationEnd: `${data.registrationEndDate}:${data.registrationEndTime}`,

        eventStartTime: `${data.eventStartDate}/${data.eventStartTime}`,
        eventEndTime: `${data.eventEndDate}/${data.eventEndTime}`,

        price: Number(data.price),
        seat: Number(data.seat),
        quantity: Number(data.quantity),
      };

      console.log(formData)

      const result = await createEvent(formData);

      console.log(result)


      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // category options

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Create Event"
            description="Plan an event to connect, socialize, or just relax together"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Event Details
            </TabsTrigger>

            <TabsTrigger
              value="types"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Event Type
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Tickets
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* event details */}
              <TabsContent value="details">
                <Card className="shadow-md border-border/50">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      Provide the basic information about your event.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      {/* input for event name */}
                      <EFormInput
                        name="title"
                        label="Event Name"
                        placeholder="Event Name"
                        type="text"
                        control={form.control}
                        required={true}
                      />
                    </div>

                    {/* select category */}
                    <div className="space-y-2">
                      <EFormSelect
                        name="category"
                        label="Category"
                        control={form.control}
                        options={categoryOptions}
                      />
                    </div>

                    <div className="space-y-2">
                      {/* Text area */}
                      <EFormTextarea
                        name="description"
                        label="Description"
                        placeholder="Description your event.."
                        control={form.control}
                        // description="You can @mention other users and organizations."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Event Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-12 text-center border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          {/* <p className="text-sm text-muted-foreground">
                            Drag and drop an image, or click to browse
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-md"
                          >
                            Upload Image
                          </Button> */}

                          <EFormImageUpload
                            control={form.control}
                            name="eventBanner"
                            multiple={false}
                            onImageUpload={setEventImageUrl}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-4">
                    <Button
                      onClick={handleNext}
                      className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      Next: Event Type
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* event type */}
              <TabsContent value="types">
                <Card className="shadow-md border-border/50">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      Provide the basic information about your event.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* select type */}
                    <div className="space-y-2">
                      <EFormSelect
                        name="eventType"
                        label="Event Type"
                        control={form.control}
                        options={eventTypeOptions}
                      />
                    </div>

                    {/* Conditional Fields OFFLINE */}
                    {isOffline && (
                      <div className="space-y-2">
                        <EFormInput
                          name="location"
                          label="Event Location"
                          control={form.control}
                          placeholder="Enter location"
                        />
                      </div>
                    )}

                    {/* conditional fields ONLINE */}
                    {isOnline && (
                      <>
                        <div className="space-y-2">
                          <EFormInput
                            name="platform"
                            label="Platform"
                            control={form.control}
                            placeholder="Zoom, Google Meet, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <EFormInput
                            name="meetingLink"
                            label="Meeting Link"
                            control={form.control}
                            placeholder="Paste meeting URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <EFormInput
                            name="password"
                            label="Meeting Password"
                            control={form.control}
                            placeholder="Enter password (if any)"
                            type="password"
                          />
                        </div>
                      </>
                    )}

                    {/* checkbox for isPublic or private */}
                    <div className="space-y-2">
                      <EFormCheckbox
                        control={form.control}
                        name="isPublic"
                        label="Is Public?"
                        description="If you select this is visible for public!"
                        required
                      />
                    </div>

                    {/* checkbox for is paid or free */}
                    <div className="space-y-2">
                      <EFormCheckbox
                        control={form.control}
                        name="isPaid"
                        label="Is paid?"
                        description="If you select this is event is paid."
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      className="rounded-md"
                      onClick={() => setActiveTab("details")}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      Next: Schedule
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Schedule */}
              <TabsContent value="schedule">
                <Card className="shadow-md border-border/50">
                  <CardHeader>
                    <CardTitle>Registration</CardTitle>
                    <CardDescription>
                      Set the date and time for your event registration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* registrationStartDate */}
                      <div className="space-y-2">
                        <EFormDateInput
                          name="registrationStartDate"
                          label="Registration Start Date"
                          control={form.control}
                        />
                      </div>

                      {/* registrationStartTime */}
                      <div className="space-y-2">
                        <EFormTimeInput
                          name="registrationStartTime"
                          label="Registration Start Time"
                          control={form.control}
                        />
                      </div>

                      {/* registrationStartDate */}
                      <div className="space-y-2">
                        <EFormDateInput
                          name="registrationEndDate"
                          label="Registration End Date"
                          control={form.control}
                        />
                      </div>

                      {/* registrationEndTime*/}
                      <div className="space-y-2">
                        <EFormTimeInput
                          name="registrationEndTime"
                          label="Registration End Time"
                          control={form.control}
                        />
                      </div>
                    </div>

                    <CardTitle>Event</CardTitle>
                    <CardDescription>
                      Set the date and time for your event.
                    </CardDescription>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* eventStartDate */}
                      <div className="space-y-2">
                        <EFormDateInput
                          name="eventStartDate"
                          label="Event Start Date"
                          control={form.control}
                        />
                      </div>

                      {/* eventStartTime */}
                      <div className="space-y-2">
                        <EFormTimeInput
                          name="eventStartTime"
                          label="Event Start Time"
                          control={form.control}
                        />
                      </div>

                      {/* eventEndDate */}
                      <div className="space-y-2">
                        <EFormDateInput
                          name="eventEndDate"
                          label="Event End Date"
                          control={form.control}
                        />
                      </div>

                      {/* eventEndTime */}
                      <div className="space-y-2">
                        <EFormTimeInput
                          name="eventEndTime"
                          label="Event End Time"
                          control={form.control}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      className="rounded-md"
                      onClick={() => setActiveTab("types")}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      Next: Tickets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* tickets */}
              <TabsContent value="tickets">
                <Card className="shadow-md border-border/50">
                  <CardHeader>
                    <CardTitle>Tickets</CardTitle>
                    <CardDescription>
                      Set up ticket types and pricing for your event.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        {/* input for event name */}
                        <EFormInput
                          name="seat"
                          label="Event Capacity"
                          placeholder="Maximum atendentess"
                          type="number"
                          control={form.control}
                          icon={<Users size={20} />}
                          required={true}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">General Admission</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <EFormInput
                            name="price"
                            label="Price"
                            placeholder="0.00"
                            type="number"
                            control={form.control}
                            required={true}
                          />
                        </div>

                        <div className="space-y-2">
                          <EFormInput
                            name="quantity"
                            label="Quantity"
                            placeholder="100"
                            type="number"
                            control={form.control}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      className="rounded-md"
                      onClick={() => setActiveTab("schedule")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isUploading}
                      className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? "Submitting..." : "Create Event"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </div>
    </>
  );
}
