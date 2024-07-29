import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

type Props = {};

export default function EditOptionsProductForm({}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm">Select Group</h4>
        <div className="max-w-[450px] flex gap-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volvo">Volvo</SelectItem>
              <SelectItem value="toyata">Toyata</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={"secondary"} size={"sm"}>
            <Plus />
            Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h6 className="font-medium">Sizes:</h6>
          <div className="flex gap-3">
            {["M", "XL", "L"].map((size) => (
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
        </div>
        <div className="flex items-center gap-2">
          <h6 className="font-medium">Colour:</h6>
          <div className="flex gap-3">
            {["Blue", "Red"].map((size) => (
              <div className="relative px-2 py-1 rounded-md flex items-center justify-center bg-slate-200 dark:bg-slate-800">
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
        </div>
      </div>

      <div className="flex gap-2">
        <Button>
          <Plus />
          Add Option
        </Button>
        <Button>Generate Product</Button>
      </div>
    </div>
  );
}
