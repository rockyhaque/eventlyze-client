"use client";
import { useState, useEffect } from "react";
import { Users, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
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
import { categoryOptions, eventTypeOptions, tabs } from "@/components/modules/Dashboard/CreateEvent/eventSelectOptions";
import EFormCheckbox from "@/components/modules/Shared/Form/EFormCheckbox";
import {  getSingleEvent, updateEvent } from "@/services/EventServices";
import { convertToISO } from "@/hooks/convertToDate";
import { useParams, useRouter } from "next/navigation";

// Validation requirements for each tab
const tabValidations = {
  details: ['title', 'category', 'description', 'eventBanner'],
  types: ['eventType', 'isPublic', 'isPaid'],
  schedule: [
    'registrationStartDate', 'registrationStartTime',
    'registrationEndDate', 'registrationEndTime',
    'eventStartDate', 'eventStartTime',
    'eventEndDate', 'eventEndTime'
  ],
  tickets: ['seat', 'quantity']
};

export default function EditEventPage() {
  const params = useParams();
  const eventId = params?.id;
  const router = useRouter()
  const form = useForm();
  const { watch, formState: { isSubmitting }, trigger, setValue } = form;
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const [eventImageUrl, setEventImageUrl] = useState<any>();
  const [activeTab, setActiveTab] = useState("details");

  const eventType = watch("eventType");
  const isPaid = watch("isPaid");
  const isOffline = eventType === "OFFLINE";
  const isOnline = eventType === "ONLINE";

  useEffect(() => {
    const getEventData = async () => {
      try {
        const eventData = await getSingleEvent(eventId as string);
        const data = eventData?.data?.event
        const parseDateTime = (isoString: string) => {
          const date = new Date(isoString);
          return {
            date: date.toISOString().split('T')[0],
            time: date.toTimeString().split(' ')[0].substring(0, 5)
          };
        };

        // Set form values
        form.reset({
          ...data,
          ...parseDateTime(data.registrationStart),
          category: data.category,
          registrationStartDate: parseDateTime(data.registrationStart).date,
          registrationStartTime: parseDateTime(data.registrationStart).time,
          registrationEndDate: parseDateTime(data.registrationEnd).date,
          registrationEndTime: parseDateTime(data.registrationEnd).time,
          eventStartDate: parseDateTime(data.eventStartTime).date,
          eventStartTime: parseDateTime(data.eventStartTime).time,
          eventEndDate: parseDateTime(data.eventEndTime).date,
          eventEndTime: parseDateTime(data.eventEndTime).time,
          quantity: data.seat
        });

        // Set image URL state
        if (data.eventBanner) {
          setEventImageUrl(data.eventBanner);
        }
      } catch (error) {
        toast.error('Failed to load event data');
      }
    };

    if (eventId) getEventData();
  }, [eventId, form]);

  useEffect(() => {
    if (!isPaid) {
      setValue('price', 0);
    }
  }, [isPaid, setValue]);

  const handleNext = async () => {
    const currentIndex = tabs.indexOf(activeTab);
    const fieldsToValidate = tabValidations[activeTab as keyof typeof tabValidations];

    if (activeTab === 'types') {
      if (isOffline) fieldsToValidate.push('location');
      if (isOnline) fieldsToValidate.push('platform', 'meetingLink');
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const uploadedImageUrl = eventImageUrl instanceof File
        ? await uploadImagesToCloudinary([eventImageUrl], false)
        : eventImageUrl;

      const formData = {
        "title": data.title,
        "description": data.description,
        "isPublic": Boolean(data.isPublic),
        "isPaid": Boolean(data.isPaid),
        "price": Number(data.price),
        "category": data.category,
        "location": data.location,
        "registrationStart": convertToISO(`${data.registrationStartDate}:${data.registrationStartTime}`),
        "registrationEnd": convertToISO(`${data.registrationEndDate}:${data.registrationEndTime}`),
        "eventStartTime": convertToISO(`${data.eventStartDate}/${data.eventStartTime}`),
        "eventEndTime": convertToISO(`${data.eventEndDate}/${data.eventEndTime}`),
        "seat": Number(data.seat),
        "eventBanner": uploadedImageUrl,
        "eventType": data.eventType,
      };

      const result = await updateEvent(eventId as string, formData);

      
      result?.success
        ? toast.success(result.message)
        : toast.error(result?.message);
    
      if(result.success){
        router.push(`/events/${data.id}`)
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Edit Event"
          description="Edit the details of your event"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Event Details Tab */}
            <TabsContent value="details">
              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Provide the basic information about your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EFormInput
                    name="title"
                    label="Event Name *"
                    placeholder="Event Name"
                    control={form.control}
                    required
                  />

                  <EFormSelect
                    name="category"
                    label="Category *"
                    control={form.control}
                    options={categoryOptions}
                    required
                  />

                  <EFormTextarea
                    name="description"
                    label="Description *"
                    placeholder="Describe your event..."
                    control={form.control}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Banner *</Label>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <EFormImageUpload
                        control={form.control}
                        name="eventBanner"
                        onImageUpload={setEventImageUrl}
                        required
                        uploadImage={eventImageUrl}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-4">
                  <Button onClick={handleNext} type="button">
                    Next: Event Type <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Event Type Tab */}
            <TabsContent value="types">
              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <CardTitle>Event Type</CardTitle>
                  <CardDescription>
                    Configure how people will join your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EFormSelect
                    name="eventType"
                    label="Event Type *"
                    control={form.control}
                    options={eventTypeOptions}
                    required
                  />

                  {isOffline && (
                    <EFormInput
                      name="location"
                      label="Venue Address *"
                      placeholder="Enter physical location"
                      control={form.control}
                      required
                    />
                  )}

                  {isOnline && (
                    <>
                      <EFormInput
                        name="platform"
                        label="Platform *"
                        placeholder="Zoom, Google Meet, etc."
                        control={form.control}
                        required
                      />
                      <EFormInput
                        name="meetingLink"
                        label="Meeting URL *"
                        placeholder="Paste meeting link"
                        control={form.control}
                        required
                      />
                    </>
                  )}

                  <EFormCheckbox
                    control={form.control}
                    name="isPublic"
                    label={
                      <div className="flex items-center gap-2">
                        Public Event
                        <Info size={16} className="text-muted-foreground" />
                      </div>
                    }
                    description="Visible to everyone. Uncheck for private event (invite-only)."
                  />

                  <EFormCheckbox
                    control={form.control}
                    name="isPaid"
                    label={
                      <div className="flex items-center gap-2">
                        Paid Event
                        <Info size={16} className="text-muted-foreground" />
                      </div>
                    }
                    description="Requires ticket purchase. Uncheck for free event."
                  />
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button onClick={handleNext} type="button">
                    Next: Schedule <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                  <CardDescription>
                    Set dates and times for registrations and the event itself
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Registration Period</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EFormDateInput
                        name="registrationStartDate"
                        label="Start Date *"
                        control={form.control}
                        required
                      />
                      <EFormTimeInput
                        name="registrationStartTime"
                        label="Start Time *"
                        control={form.control}
                        required
                      />
                      <EFormDateInput
                        name="registrationEndDate"
                        label="End Date *"
                        control={form.control}
                        required
                      />
                      <EFormTimeInput
                        name="registrationEndTime"
                        label="End Time *"
                        control={form.control}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Event Period</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EFormDateInput
                        name="eventStartDate"
                        label="Start Date *"
                        control={form.control}
                        required
                      />
                      <EFormTimeInput
                        name="eventStartTime"
                        label="Start Time *"
                        control={form.control}
                        required
                      />
                      <EFormDateInput
                        name="eventEndDate"
                        label="End Date *"
                        control={form.control}
                        required
                      />
                      <EFormTimeInput
                        name="eventEndTime"
                        label="End Time *"
                        control={form.control}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("types")}>
                    Back
                  </Button>
                  <Button onClick={handleNext} type="button">
                    Next: Tickets <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets">
              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <CardTitle>Tickets</CardTitle>
                  <CardDescription>
                    Configure pricing and availability for event tickets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EFormInput
                    name="seat"
                    label="Total Capacity *"
                    placeholder="Maximum attendees"
                    type="number"
                    control={form.control}
                    icon={<Users size={20} />}
                    required
                  />

                  <div className="border rounded-lg p-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <EFormInput
                        name="price"
                        label={`Ticket Price ${isPaid ? '*' : ''}`}
                        placeholder="0.00"
                        type="number"
                        control={form.control}
                        disabled={!isPaid}
                        required={isPaid}
                        min={0}
                      />
                      <EFormInput
                        name="quantity"
                        label="Available Tickets *"
                        placeholder="Number of tickets"
                        type="number"
                        control={form.control}
                        required
                        min={1}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("schedule")}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isUploading}>
                    {isSubmitting ? "Editing Event..." : "Publish Event"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
