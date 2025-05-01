"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Sample attendees data
const attendees = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: [
    "Alex Johnson",
    "Sarah Miller",
    "David Chen",
    "Jessica Williams",
    "Michael Brown",
    "Emily Davis",
    "James Wilson",
    "Olivia Taylor",
    "Daniel Anderson",
    "Sophia Martinez",
    "Matthew Thomas",
    "Emma Garcia",
    "Andrew Robinson",
    "Ava Lewis",
    "Ryan Walker",
    "Mia Hall",
    "Christopher Allen",
    "Isabella Young",
    "Ethan King",
    "Charlotte Wright",
  ][i],
  image: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
  role: [
    "Developer",
    "Designer",
    "Product Manager",
    "Marketing",
    "CEO",
    "CTO",
    "Student",
    "Engineer",
    "Researcher",
    "Entrepreneur",
  ][i % 10],
  company: [
    "TechCorp",
    "DesignHub",
    "InnovateLabs",
    "MarketBoost",
    "StartupX",
    "CodeWorks",
    "University of Tech",
    "EngineerPro",
    "ResearchLabs",
    "VentureStart",
  ][i % 10],
  isConnected: i % 5 === 0,
}))

export function EventAttendees() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const roles = [...new Set(attendees.map((a) => a.role))]

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(attendee.role)

    return matchesSearch && matchesRole
  })

  return (
    <motion.div
      className="rounded-xl border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-bold">Attendees</h2>
          <Badge variant="outline" className="ml-2">
            {attendees.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFilters(!showFilters)}>
          <Filter className={cn("h-4 w-4", showFilters && "text-primary")} />
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <div className="rounded-lg border bg-muted/50 p-3">
              <h3 className="mb-2 text-sm font-medium">Filter by role</h3>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {filteredAttendees.length > 0 ? (
            filteredAttendees.map((attendee, index) => (
              <motion.div
                key={attendee.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={attendee.image || "/placeholder.svg"} alt={attendee.name} />
                    <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{attendee.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {attendee.role} at {attendee.company}
                    </div>
                  </div>
                </div>
                <Button variant={attendee.isConnected ? "default" : "outline"} size="sm" className="h-8 text-xs">
                  {attendee.isConnected ? "Connected" : "Connect"}
                </Button>
              </motion.div>
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
              <div>
                <p>No attendees found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  )
}
