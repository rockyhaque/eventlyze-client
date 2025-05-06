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
  const [price, setPrice] = useQueryState("price", { defaultValue: "" });

  
  
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

  const handlePriceSort = (value: string) => {
    setPrice(value);
    setTimeout(() => {
      refetchEvents();
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

          <Select value={price} onValueChange={(val) => handlePriceSort(val)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price (Low to High)</SelectItem>
              <SelectItem value="desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
