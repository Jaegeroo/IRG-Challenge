"use consultant";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ChevronsUpDown } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { ConsultantsT } from "@/lib/types";
import { useConsultantStore } from "@/context/consultant/hook";
import debounce from "debounce";

export default function ConsultantComboBoxInput({
  consultant,
  setForm,
}: {
  consultant: string;
  setForm: (e: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    items: consultants,
    ref,
    loading,
  } = useInfiniteScroll<ConsultantsT>({
    searchQuery,
    storeHook: useConsultantStore,
  });

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {consultant
            ? consultants.find((item) => item.id === consultant)?.name
            : "Select Consultant"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex-1 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search"
            onValueChange={handleSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty className="flex justify-center items-center pt-1 text-sm">
              {loading ? (
                <div className="flex flex-col w-full gap-1 mx-1">
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <Skeleton key={index} className="h-8" />
                    ))}
                </div>
              ) : consultants.length > 0 ? (
                "No matching consultant found."
              ) : (
                "No consultants found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {consultants.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setForm(currentValue === consultant ? "" : item.id);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      consultant === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <div ref={ref} />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
