"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function EventsFilter() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  // const [hello, setHello] = useQueryState("hello", { defaultValue: "" });


  const eventTypes = [
    { id: "public-free", label: "Public Free" },
    { id: "public-paid", label: "Public Paid" },
    { id: "private-free", label: "Private Free" },
    { id: "private-paid", label: "Private Paid" },
  ]

  const categories = ["Music", "Technology", "Business", "Food & Drink", "Arts", "Sports", "Health", "Education"]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 500])
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search events by title or organizer..." className="pl-9" />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-asc">Date (Ascending)</SelectItem>
              <SelectItem value="date-desc">Date (Descending)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1.5">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Events</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Event Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {eventTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant="outline"
                        className={cn(
                          "justify-start",
                          activeFilters.includes(type.id) && "border-primary bg-primary/10",
                        )}
                        onClick={() => toggleFilter(type.id)}
                      >
                        {activeFilters.includes(type.id) && (
                          <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            ✓
                          </span>
                        )}
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={activeFilters.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Additional Filters</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="online-events">Online Events</Label>
                      <Switch id="online-events" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="accessible">Accessible</Label>
                      <Switch id="accessible" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="family-friendly">Family Friendly</Label>
                      <Switch id="family-friendly" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => {}}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {filter} filter</span>
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
