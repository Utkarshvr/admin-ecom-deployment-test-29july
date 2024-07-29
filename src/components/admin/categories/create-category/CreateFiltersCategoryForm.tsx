"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Cross, Filter, Minus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {};

export default function CreateFiltersCategoryForm({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm">Parent Category</h4>
        <div className="max-w-[450px] flex gap-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Parent Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volvo">Volvo</SelectItem>
              <SelectItem value="toyata">Toyata</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={"secondary"} size={"sm"}>
            <Filter />
            Add Filter
          </Button>
        </div>
      </div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="sizes">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Button className="w-7 h-7" size={"icon"} variant={"destructive"}>
                <Minus />
              </Button>
              <p className="text-sm font-bold">Sizes</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-2 flex flex-col gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              action={undefined}
              className="max-w-[400px] flex items-center gap-2"
            >
              <Input placeholder="XS" />
              <Button type="submit" variant={"outline"} size={"sm"}>
                Add
              </Button>
            </form>
            <div className="flex gap-3">
              {["M", "SM", "L", "S", "XL"].map((size) => (
                <div className="relative p-2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                  <p className="text-sm font-bold">{size}</p>
                  <Button
                    className="w-4 h-4 rounded-full absolute top-[-4px] right-[-4px]"
                    size={"icon"}
                    variant={"destructive"}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sleeve-types">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Button className="w-7 h-7" size={"icon"} variant={"destructive"}>
                <Minus />
              </Button>
              <p className="text-sm font-bold">Sleeve Types</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-2 flex flex-col gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              action={undefined}
              className="max-w-[400px] flex items-center gap-2"
            >
              <Input placeholder="Full Sleeves" />
              <Button type="submit" variant={"outline"} size={"sm"}>
                Add
              </Button>
            </form>
            <div className="flex flex-col gap-1">
              {["Sleeve Less", "Half Sleeves"].map((size) => (
                <p className="text-sm font-bold">{size}</p>
                // <div className="relative p-2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800">
                //   <Button
                //     className="w-4 h-4 rounded-full absolute top-[-4px] right-[-4px]"
                //     size={"icon"}
                //     variant={"destructive"}
                //   >
                //     <X size={12} />
                //   </Button>
                // </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
