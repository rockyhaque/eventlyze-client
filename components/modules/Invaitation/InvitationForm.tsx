"use client";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import EFormInput from "../Shared/Form/EFormInput";
import { sentInvitation } from "@/services/Invitation";
import { toast } from "sonner";

const InvitationForm = ({ eventId }: { eventId: string }) => {
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const inviteEmail = {
        email: data.email,
      };

      const result = await sentInvitation(eventId, inviteEmail);

      if (result?.success) {
        toast.success("Invitation sent successfully!");
        form.reset();
      }
    } catch (error: any) {
      toast.error("Invitation sent  failed!");
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-xl border p-6">
            <h3 className="mb-4 font-medium">Invite your friends</h3>

            <EFormInput
              name="email"
              placeholder="Invite your friends in this event..."
              control={form.control}
              required
            />

            <Button className="my-3" type="submit">
              Invite here
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InvitationForm;
