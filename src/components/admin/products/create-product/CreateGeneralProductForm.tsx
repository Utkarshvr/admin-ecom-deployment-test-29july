"use client";

import { ReactNode, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axiosInstance";

import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/extension/multiple-selector";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}

type Props = {};
export default function CreateGeneralProductForm({}: Props) {
  const [categoriesOptions, setCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${baseURL}/category/list`, {
          method: "POST",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
          },
        });
        const data = await res.json();

        console.log(data);
        setCategoriesOptions(
          data.resp.map((e: any) => ({ label: e.name, value: e._id }))
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    categoryId: string[];
  }>({
    name: "",
    price: "",
    categoryId: [],
  });

  async function createProd() {
    try {
      const res = await fetch(`${baseURL}/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ categoriesOptions });
  return (
    <div className="mt-4 flex gap-[36px]">
      <div className="flex flex-[0.5] flex-col gap-4">
        <Wrapper>
          <Label>Product Name</Label>
          <Input
            type="text"
            placeholder="T-Shirt"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={formData.name}
          />
        </Wrapper>

        <Wrapper>
          <Label>Parent Categories</Label>
          <MultipleSelector
            options={categoriesOptions}
            onChange={(options) =>
              setFormData((prev) => ({
                ...prev,
                categoryId: options.map(({ value }) => value),
              }))
            }
            placeholder="Select Parent Categories"
          />
        </Wrapper>

        <Wrapper>
          <Label>Max Retail Price</Label>
          <Input
            type="number"
            placeholder="299"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            value={formData.price}
          />
        </Wrapper>
        <Button onClick={createProd}>Create</Button>
      </div>
    </div>
  );
}
