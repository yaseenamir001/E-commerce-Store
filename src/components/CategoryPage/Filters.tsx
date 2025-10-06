import { useMemo } from "react";
import type { Product } from "@/api/productApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  products: Product[];
  filters: Record<string, string[]>;
  onFilterChange: (section: string, option: string, checked: boolean) => void;
  categoryName?: string;
}

const predefinedFilters: Record<
  string,
  { id: string; name: string; options: string[] }[]
> = {
  Phones: [
    {
      id: "brand",
      name: "Brand",
      options: ["Apple", "Samsung", "Xiaomi", "Oppo", "Motorola", "Realme"],
    },
    {
      id: "battery",
      name: "Battery Capacity",
      options: ["3000mAh", "4000mAh", "5000mAh"],
    },
    { id: "screen", name: "Screen Type", options: ["OLED", "LCD"] },
    {
      id: "memory",
      name: "Built-in Memory",
      options: ["64GB", "128GB", "256GB"],
    },
  ],
  Computers: [
    {
      id: "brand",
      name: "Brand",
      options: ["HP", "Dell", "Asus", "Lenovo", "Apple"],
    },
    {
      id: "processor",
      name: "Processor",
      options: ["i3", "i5", "i7", "Ryzen 5"],
    },
    { id: "ram", name: "RAM", options: ["8GB", "16GB", "32GB"] },
    {
      id: "storage",
      name: "Storage",
      options: ["256GB SSD", "512GB SSD", "1TB HDD"],
    },
  ],
  Cameras: [
    {
      id: "brand",
      name: "Brand",
      options: ["Canon", "Nikon", "Sony", "Fujifilm"],
    },
    { id: "lens", name: "Lens Type", options: ["Wide", "Zoom", "Macro"] },
    { id: "resolution", name: "Resolution", options: ["12MP", "24MP", "48MP"] },
  ],
  Headphones: [
    { id: "brand", name: "Brand", options: ["Sony", "Beats", "JBL", "Apple"] },
    { id: "type", name: "Type", options: ["Over-Ear", "In-Ear"] },
    {
      id: "connectivity",
      name: "Connectivity",
      options: ["Wired", "Bluetooth"],
    },
  ],
  "Smart Watches": [
    {
      id: "brand",
      name: "Brand",
      options: ["Apple", "Rolex", "IWC", "Longines"],
    },
    {
      id: "strap",
      name: "Strap Type",
      options: ["Leather", "Silicone", "Metal"],
    },
    {
      id: "features",
      name: "Features",
      options: ["Heart Rate", "Sleep Tracking", "GPS"],
    },
  ],
  Gaming: [
    {
      id: "brand",
      name: "Brand",
      options: ["Sony", "Microsoft", "Logitech", "Razer"],
    },
    {
      id: "type",
      name: "Type",
      options: ["Controller", "Headset", "Keyboard", "Mouse"],
    },
    {
      id: "compatibility",
      name: "Compatibility",
      options: ["PC", "PlayStation", "Xbox"],
    },
  ],
};

function generateRuntimeFilters(products: Product[]) {
  const dynamicKeys = ["brand", "battery", "memory", "type"];
  const sections: Record<string, Set<string>> = {};

  for (const product of products) {
    for (const key of dynamicKeys) {
      const value = product[key];
      if (typeof value === "string" && value.trim() !== "") {
        if (!sections[key]) sections[key] = new Set();
        sections[key].add(value);
      }
    }
  }

  return Object.keys(sections).map((key) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    options: Array.from(sections[key]),
  }));
}

export default function Filters({
  products,
  filters,
  onFilterChange,
  categoryName,
}: FiltersProps) {
  const filterSections = useMemo(() => {
    if (categoryName && predefinedFilters[categoryName]) {
      return predefinedFilters[categoryName];
    }
    return generateRuntimeFilters(products);
  }, [categoryName, products]);

  return (
    <Accordion type="single" collapsible className="w-full">
      {filterSections.length > 0 ? (
        filterSections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {section.options.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={`${section.id}-${option}`}
                      checked={filters[section.id]?.includes(option) || false}
                      onCheckedChange={(checked) =>
                        onFilterChange(section.id, option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`${section.id}-${option}`}
                      className="text-sm text-gray-700"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <p className="text-gray-500 p-2">
          No filters available for this category.
        </p>
      )}
    </Accordion>
  );
}
