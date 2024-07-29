"use client";

import FormItemWrapper from "@/components/common/FormItemWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { Minus, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const { id } = useParams();

  const [groupName, setGroupName] = useState("");

  const [attributeNames, setAttributeNames] = useState([""]);

  async function updateAttribute() {
    try {
      const { data } = await axiosInstance.put(
        `/attributes/update/${id}`,
        {
          groupName,
          properties: attributeNames,
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
          },
        }
      );
      console.log({ data });
      toast({ title: "Attribute Updated Successfully" });
      router.replace("/admin/attributes");
    } catch (error) {
      console.log(error);
      toast({ title: "Attribute not updated" });
    }
  }

  console.log({ id });

  useEffect(() => {
    if (id)
      (async () => {
        try {
          const { data } = await axiosInstance.get(`/attributes/detail/${id}`, {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
            },
          });
          console.log({ data });
          setGroupName(data.attribute.groupName);
          setAttributeNames(data.attribute.properties);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [id]);

  return (
    <div className="h-full mx-auto">
      <h1 className="text-3xl font-bold mb-2">Edit Attribute</h1>
      <div className="flex h-full items-center justify-center">
        <Card className="min-w-[400px]">
          <CardHeader>Edit</CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormItemWrapper label="Group Name">
              <Input
                placeholder="Dimensions"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormItemWrapper>
            {groupName && (
              <FormItemWrapper label={groupName}>
                {attributeNames.map((att_name, index) => (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Attribute Name"
                      value={att_name}
                      disabled={attributeNames.length === 1}
                      onChange={(e) =>
                        setAttributeNames((prev) => {
                          const duplicate = [...prev];
                          console.log(duplicate);
                          duplicate[index] = e.target.value;
                          console.log(duplicate);
                          return duplicate;
                        })
                      }
                    />
                    <Button
                      onClick={() =>
                        setAttributeNames((prev) =>
                          [...prev].filter((e, i) => i !== index)
                        )
                      }
                      variant={"destructive"}
                      size={"icon"}
                    >
                      <Minus />
                    </Button>
                  </div>
                ))}
                <Button
                  disabled={attributeNames.some((n) => n === "" || !n)}
                  onClick={() => setAttributeNames((prev) => [...prev, ""])}
                  className="m-auto"
                  size={"icon"}
                >
                  <Plus />
                </Button>
              </FormItemWrapper>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={updateAttribute}>Update</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
