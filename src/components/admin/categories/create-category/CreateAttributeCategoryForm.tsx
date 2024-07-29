"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { AttributeType } from "@/types/admin/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

export default function CreateAttributeCategoryForm({}: Props) {
  const { id } = useParams();

  const [allAttributes, setAllAttributes] = useState<AttributeType[]>([]);

  const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.post(`/attributes/list`);
        console.log({ data });
        setAllAttributes(data.list);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function setAttributes() {
    try {
      const { data } = await axiosInstance.post(
        `/category/set-attributes/${id}`,
        { attributes: checkedAttributes }
      );
      console.log({ data });
      toast({ title: "Attributes Set" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {allAttributes.map((att) => (
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={checkedAttributes.includes(att._id)}
            onCheckedChange={(checked) =>
              checked
                ? setCheckedAttributes((prev) => [...prev, att._id])
                : setCheckedAttributes((prev) =>
                    [...prev].filter((value) => value !== att._id)
                  )
            }
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {att.groupName}
          </label>
        </div>
      ))}
      <Button onClick={setAttributes}>Set Attributes</Button>
    </div>
  );
}
