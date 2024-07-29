import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
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
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";

type Props = {
  categoryID: string;
  formData: {
    name: string;
    description: string;
    metaTagKeyword: string;
    metaTagDescription: string;
    metaTagTitle: string;
    parentId: string;
    image: File | null;
    attributes: never[];
  };
  setFormData: Dispatch<
    SetStateAction<{
      name: string;
      description: string;
      metaTagKeyword: string;
      metaTagDescription: string;
      metaTagTitle: string;
      parentId: string;
      image: File | null;
      attributes: never[];
    }>
  >;
};

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}

export default function EditGeneralCategoryForm({
  formData,
  setFormData,
  categoryID,
}: Props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    const allowedFields = [
      "name",
      "description",
      "metaTagKeyword",
      "metaTagDescription",
      "metaTagTitle",
      "parentId",
      "image",
    ];
    for (const key in formData) {
      if (allowedFields.includes(key))
        form.append(key, formData[key as keyof typeof formData] as any);
    }

    try {
      const { data } = await axiosInstance.put(
        `/category/update/${categoryID}`,
        form
      );

      console.log("Update Category Response:", data);
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
        Update
      </Button>
    </div>
  );
}
