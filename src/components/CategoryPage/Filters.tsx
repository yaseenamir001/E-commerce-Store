import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const filterOptions = [
  {
    id: "brand",
    name: "Brand",
    options: ["Apple", "Samsung", "Xiaomi", "Oppo", "Motorola", "Realme"],
  },
  { id: "battery", name: "Battery Capacity", options: ["3000mAh", "5000mAh"] },
  { id: "screen", name: "Screen Type", options: ["OLED", "LCD"] },
  { id: "memory", name: "Memory", options: ["64GB", "128GB", "256GB"] },
];

export default function Filters() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {filterOptions.map((filter) => (
        <AccordionItem key={filter.id} value={filter.id}>
          <AccordionTrigger>{filter.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {filter.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <Checkbox id={`${filter.id}-${option}`} />
                  <Label
                    htmlFor={`${filter.id}-${option}`}
                    className="text-sm text-gray-700"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
