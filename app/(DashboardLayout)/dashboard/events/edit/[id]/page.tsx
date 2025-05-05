"use client";
import { useState, useEffect } from "react";
import { Users, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
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
import { createEvent, getSingleEvent } from "@/services/EventServices";
import { convertToISO } from "@/hooks/convertToDate";
import { useParams } from "next/navigation";

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
  const [eventData, setEventData] = useState<any>(null);
  const params = useParams();
  const eventId = params?.id;

  const { control, handleSubmit, setValue, watch, formState: { isSubmitting }, trigger } = useForm();
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const [eventImageUrl, setEventImageUrl] = useState<File | File[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const eventType = watch("eventType");
  const isPaid = watch("isPaid");
  const isOffline = eventType === "OFFLINE";
  const isOnline = eventType === "ONLINE";

  useEffect(() => {
    const getEventData = async () => {
      const data = await getSingleEvent(eventId as string);
      setEventData(data);

      if (data) {
        setValue('title', data.title);
        setValue('category', data.category);
        setValue('description', data.description);
        setValue('eventBanner', data.eventBanner);
        setValue('eventType', data.eventType);
        setValue('isPublic', data.isPublic);
        setValue('isPaid', data.isPaid);
        setValue('price', data.price);
        setValue('location', data.location);
        setValue('platform', data.platform);
        setValue('meetingLink', data.meetingLink);
        setValue('registrationStartDate', data.registrationStartDate);
        setValue('registrationStartTime', data.registrationStartTime);
        setValue('registrationEndDate', data.registrationEndDate);
        setValue('registrationEndTime', data.registrationEndTime);
        setValue('eventStartDate', data.eventStartDate);
        setValue('eventStartTime', data.eventStartTime);
        setValue('eventEndDate', data.eventEndDate);
        setValue('eventEndTime', data.eventEndTime);
        setValue('seat', data.seat);
        setValue('quantity', data.quantity);
      }
    };

    getEventData();
  }, [eventId, setValue]);

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
      const uploadedImageUrl = await uploadImagesToCloudinary(eventImageUrl, false);

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

      const result = await createEvent(formData);
      result?.success ? toast.success(result.message) : toast.error(result?.message);
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

        <Form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    control={control}
                    defaultValue={eventData?.title}
                    required
                  />
                  <EFormSelect
                    name="category"
                    label="Category *"
                    control={control}
                    options={categoryOptions}
                    defaultValue={eventData?.category}
                    required
                  />
                  <EFormTextarea
                    name="description"
                    label="Description *"
                    placeholder="Describe your event..."
                    control={control}
                    defaultValue={eventData?.description}
                    required
                  />
                  <div className="space-y-2">
                    <Label htmlFor="image">Event Banner *</Label>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <EFormImageUpload
                        control={control}
                        name="eventBanner"
                        multiple={false}
                        onImageUpload={setEventImageUrl}
                        defaultValue={eventData?.eventBanner}
                        required
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

            {/* Other tabs (types, schedule, tickets) remain the same */}
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
