"use client"

import { motion } from "framer-motion"
import { Calendar, Search, Users, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find Events",
      description: "Discover events that match your interests and preferences.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Calendar,
      title: "Join or Create",
      description: "Participate in existing events or create your own to share with others.",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Users,
      title: "Connect",
      description: "Meet like-minded people and build your network.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: CheckCircle,
      title: "Enjoy",
      description: "Have a great time and create lasting memories.",
      color: "bg-green-500/10 text-green-500",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mt-2 text-muted-foreground">Simple steps to get started with Eventify</p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center" variants={item}>
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${step.color}`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
