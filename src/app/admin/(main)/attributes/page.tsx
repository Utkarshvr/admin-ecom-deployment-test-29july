"use client";

import { useEffect, useState } from "react";
import AttributeCard from "@/components/admin/attributes/card/AttributeCard";
import axiosInstance from "@/lib/axiosInstance";
import { AttributeType } from "@/types/admin/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  const [attributes, setAttributes] = useState<AttributeType[]>([]);

  async function loadAttributes() {
    try {
      const response = await axiosInstance.post(
        "/attributes/list",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
          },
        }
      );
      console.log(response);
      setAttributes(response.data?.list);
    } catch (error) {
      console.error("Error retrieving data:", error);
      // throw new Error("Could not get data");
    }
  }
  useEffect(() => {
    loadAttributes();
  }, []);

  console.log({ attributes });

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Attributes</h1>
      <div className="flex justify-end">
        <Link href={"attributes/create"}>
          <Button>Create</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-3">
        {attributes.map((e) => (
          <div key={e._id}>
            <AttributeCard attribute={e} loadAttributes={loadAttributes} />
          </div>
        ))}
      </div>
    </div>
  );
}
