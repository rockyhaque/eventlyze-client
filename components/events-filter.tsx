"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryState } from "nuqs";

interface IEventsFilterParams {
  refetchEvents: () => Promise<void>;
}

export function EventsFilter({ refetchEvents }: IEventsFilterParams) {
  const [search, setSearch] = useQueryState("searchTerm", { defaultValue: "" });
  const [isPaid, setIsPaid] = useQueryState("isPaid", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "" });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "",
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setTimeout(() => {
      refetchEvents();
    }, 100);
  };

  const handlePaidSort = (value: string) => {
    setIsPaid(value);
    setTimeout(() => {
      refetchEvents();
    }, 100);
  };

  const handleSortChange = (sortField: string, order: string) => {
    setSortBy(sortField);
    setSortOrder(order);
    setTimeout(() => {
      refetchEvents(); // or refetch from useQuery
    }, 100);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events by title or organizer..."
            className="pl-9"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={isPaid} onValueChange={(val) => handlePaidSort(val)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Paid Event</SelectItem>
              <SelectItem value="false">Free Event</SelectItem>
            </SelectContent>
          </Select>

          {/* <Select value={sortOrder} onValueChange={(val) => handlePriceSort(val)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price (Low to High)</SelectItem>
              <SelectItem value="desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select> */}

          <Select
            onValueChange={(val) => {
              const [field, order] = val.split(":");
              handleSortChange(field, order);
            }}
            value={`${sortBy}:${sortOrder}`}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort events" />
            </SelectTrigger>
            <SelectContent className="text-white">
              <SelectItem value="price:asc">Price (Low to High)</SelectItem>
              <SelectItem value="price:desc">Price (High to Low)</SelectItem>
              <SelectItem value="seat:asc">Seat (Low to High)</SelectItem>
              <SelectItem value="seat:desc">Seat (High to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
