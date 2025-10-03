import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const filterSections = [
  {
    id: "brand",
    name: "Brand",
    options: ["Apple", "Samsung", "Xiaomi", "Oppo", "Motorola", "Realme"],
  },
  { id: "battery", name: "Battery capacity", options: ["3000mAh", "5000mAh"] },
  { id: "screen", name: "Screen type", options: ["OLED", "LCD"] },
  {
    id: "memory",
    name: "Built-in memory",
    options: ["64GB", "128GB", "256GB"],
  },
];

interface FiltersProps {
  filters: Record<string, string[]>;
  onFilterChange: (section: string, option: string, checked: boolean) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {filterSections.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {item.options.map((option) => (
                <div key={option} className="flex items-center space-x-4">
                  <Checkbox
                    id={`${item.id}-${option}`}
                    checked={filters[item.id]?.includes(option) || false}
                    onCheckedChange={(checked) =>
                      onFilterChange(item.id, option, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${item.id}-${option}`}
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
