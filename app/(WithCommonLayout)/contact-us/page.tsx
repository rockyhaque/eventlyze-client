"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import EFormInput from "@/components/modules/Shared/Form/EFormInput";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const sendContactMessage = async (data: FieldValues) => {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Message sent successfully!" });
    }, 1000);
  });
};

export default function ContactUsPage() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await sendContactMessage(data);
      if (result?.success) {
        toast.success(result.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Error sending message. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-xl border bg-card p-1 md:grid-cols-2 md:p-0">
        {/* Image Side */}
        <motion.div
          className="relative hidden overflow-hidden rounded-l-xl md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-background"></div>
          <Image
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Us"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold">
              Get in Touch
            </h2>
            <p className="mb-4 max-w-md text-sm text-white/80">
              Have questions about creating or joining events? Reach out to our
              team, and we’ll get back to you as soon as possible.
            </p>
            <Button variant="secondary" className="gap-2">
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          className="flex flex-col justify-center p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Contact Us
              </h1>
              <p className="text-muted-foreground">
                Send us a message, and we’ll respond promptly
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {/* Input for Name */}
                  <div className="space-y-2">
                    <EFormInput
                      name="name"
                      label="Full Name"
                      placeholder="Your Name"
                      type="text"
                      control={form.control}
                      icon={<User size={20} />}
                      required={true}
                    />
                  </div>
                  {/* Input for Email */}
                  <div className="space-y-2">
                    <EFormInput
                      name="email"
                      label="Email"
                      placeholder="Your Email"
                      type="text"
                      control={form.control}
                      icon={<Mail size={20} />}
                      required={true}
                    />
                  </div>
                  {/* Input for Subject */}
                  <div className="space-y-2">
                    <EFormInput
                      name="subject"
                      label="Subject"
                      placeholder="Subject"
                      type="text"
                      control={form.control}
                      icon={<MessageSquare size={20} />}
                      required={true}
                    />
                  </div>
                  {/* Input for Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      {...form.register("message")}
                      className="min-h-[100px]"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <span>Send Message</span>
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-center text-sm text-muted-foreground">
              By submitting this form, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-primary underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
