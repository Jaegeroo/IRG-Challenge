"use client";

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
import { ClientsT } from "@/lib/types";
import { useClientStore } from "@/context/client/hook";
import debounce from "debounce";

export default function ClientComboBoxInput({
  client,
  setForm,
}: {
  client: string;
  setForm: (e: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    items: clients,
    ref,
    loading,
  } = useInfiniteScroll<ClientsT>({
    searchQuery,
    storeHook: useClientStore,
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
          {client
            ? clients.find((item) => item.id === client)?.name
            : "Select Client"}
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
              ) : clients.length > 0 ? (
                "No matching client found."
              ) : (
                "No clients found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {clients.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setForm(currentValue === client ? "" : item.id);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      client === item.id ? "opacity-100" : "opacity-0"
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
