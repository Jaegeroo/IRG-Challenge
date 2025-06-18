"use project";

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
import { ProjectsT } from "@/lib/types";
import { useProjectStore } from "@/context/project/hook";
import debounce from "debounce";

export default function ProjectComboBoxInput({
  project,
  setForm,
}: {
  project: string;
  setForm: (e: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    items: projects,
    ref,
    loading,
  } = useInfiniteScroll<ProjectsT>({
    searchQuery,
    storeHook: useProjectStore,
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
          {project
            ? projects.find((item) => item.id === project)?.name
            : "Select Project"}
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
              ) : projects.length > 0 ? (
                "No matching project found."
              ) : (
                "No projects found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {projects.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setForm(currentValue === project ? "" : item.id);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      project === item.id ? "opacity-100" : "opacity-0"
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
