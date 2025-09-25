import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: ["Apple", "Samsung", "Sony", "Boat", "Oppo", "Xiaomi"],
  },
  { id: "battery", name: "Battery capacity", options: ["3000mAh", "5000mAh"] },
  { id: "screen", name: "Screen type", options: ["OLED", "LCD"] },
  {
    id: "memory",
    name: "Built-in memory",
    options: ["64GB", "128GB", "256GB"],
  },
];

export default function Filters() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {filters.map((filter) => (
        <AccordionItem key={filter.id} value={filter.id}>
          <AccordionTrigger>{filter.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filter.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
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
