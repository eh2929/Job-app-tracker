import * as React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const statuses = [
  { value: "applied", label: "Applied" },
  { value: "interviewed", label: "Interviewed" },
  { value: "offered", label: "Offered" },
  { value: "rejected", label: "Rejected" },
];

export function ComboBoxResponsive({ field, options }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState(
    field && field.value
      ? statuses.find((status) => status.value === field.value)
      : null
  );

  React.useEffect(() => {
    if (field && field.onChange) {
      field.onChange(selectedStatus ? selectedStatus.value : "");
    }
  }, [selectedStatus, field]);

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? selectedStatus.label : "+ Set status"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList options={options} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? selectedStatus.label : "+ Set status"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[200px] p-0" align="start">
        <StatusList options={options} setSelectedStatus={setSelectedStatus} />
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({ options, setSelectedStatus }) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(value) => {
                setSelectedStatus(
                  options.find((option) => option.value === value) || null
                );
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
export default ComboBoxResponsive;
