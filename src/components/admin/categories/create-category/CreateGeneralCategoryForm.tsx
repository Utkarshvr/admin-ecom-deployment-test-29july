"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}

type Props = {};
export default function CreateGeneralCategoryForm({}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metaTagKeyword: "",
    metaTagDescription: "",
    metaTagTitle: "",
    parentId: "uio212y78",
    image: null as File | null,
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key as keyof typeof formData] as any);
    }

    try {
      const { data } = await axiosInstance.post("/category/create", form, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });

      console.log("Create Category Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-[36px]">
        <div className="flex flex-[0.5] flex-col gap-3">
          <Wrapper>
            <Label>Category Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              placeholder="T-Shirt"
            />
          </Wrapper>
          <Wrapper>
            <Label>Parent Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volvo">Volvo</SelectItem>
                <SelectItem value="toyata">Toyata</SelectItem>
              </SelectContent>
            </Select>
          </Wrapper>
          <Wrapper>
            <Label>Meta Tag Title</Label>
            <Input
              value={formData.metaTagTitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  metaTagTitle: e.target.value,
                }))
              }
              type="text"
              placeholder="T-Shirt"
            />
          </Wrapper>
          <Wrapper>
            <Label>Meta Tag Name</Label>
            <Input
              value={formData.metaTagKeyword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  metaTagKeyword: e.target.value,
                }))
              }
              type="text"
              placeholder="T-Shirt"
            />
          </Wrapper>
        </div>
        <div className="flex flex-[0.5] flex-col gap-3">
          <Wrapper>
            <Label>Meta Tag Description</Label>
            <Textarea
              value={formData.metaTagDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  metaTagDescription: e.target.value,
                }))
              }
              placeholder="Some description here."
            />
          </Wrapper>
          <Wrapper>
            <Label>Category description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Some description here."
            />
          </Wrapper>
          <Wrapper>
            <Label>Category Image</Label>
            <Input
              id="picture"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />
          </Wrapper>
        </div>
      </div>
      <Button className="w-max" onClick={handleSubmit}>
        Create
      </Button>
    </div>
  );
}
