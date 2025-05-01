"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Mail, Calendar, Bell } from "lucide-react"

export function EventsNewsletter() {
  const [email, setEmail] = useState("")
  const [preferences, setPreferences] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, this would be an API call
      setIsSubmitted(true)
    }
  }

  const togglePreference = (preference: string) => {
    setPreferences((prev) => (prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference]))
  }

  const preferenceOptions = [
    { id: "weekly", label: "Weekly event digest", icon: Calendar },
    { id: "recommendations", label: "Personalized recommendations", icon: Mail },
    { id: "reminders", label: "Event reminders", icon: Bell },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 md:p-12">
          {isSubmitted ? (
            <motion.div
              className="flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Thank You for Subscribing!</h3>
              <p className="mt-2 text-center text-muted-foreground">
                You'll now receive our latest updates and event recommendations.
              </p>
              <Button className="mt-6 " onClick={() => setIsSubmitted(false)}>
                Update Preferences
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-display text-2xl font-bold md:text-3xl">Never Miss an Event</h2>
                  <p className="mt-2 text-muted-foreground">
                    Subscribe to our newsletter for personalized event recommendations and updates
                  </p>
                </motion.div>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-6">
                  <Label htmlFor="email" className="mb-2 block">
                    Email Address
                  </Label>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                    <Button type="submit" className="">
                      Subscribe
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="block">Subscription Preferences</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {preferenceOptions.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all",
                          preferences.includes(option.id) && "border-primary bg-primary/5",
                        )}
                        onClick={() => togglePreference(option.id)}
                      >
                        <Checkbox
                          id={option.id}
                          checked={preferences.includes(option.id)}
                          onCheckedChange={() => togglePreference(option.id)}
                        />
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4 text-primary" />
                          <Label htmlFor={option.id} className="cursor-pointer text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <a href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </motion.form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
