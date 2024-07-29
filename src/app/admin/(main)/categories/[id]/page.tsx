"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EditAttributeCategoryForm from "@/components/admin/categories/edit-category/EditAttributeCategoryForm";
import EditFiltersCategoryForm from "@/components/admin/categories/edit-category/EditFiltersCategoryForm";
import EditGeneralCategoryForm from "@/components/admin/categories/edit-category/EditGeneralCategoryForm";
import { ChangeEvent, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metaTagKeyword: "",
    metaTagDescription: "",
    metaTagTitle: "",
    parentId: "uio212y78",
    image: null as File | null,
    attributes: [],
  });

  useEffect(() => {
    if (id)
      (async () => {
        try {
          const { data } = await axiosInstance.get(`/category/detail/${id}`, {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
            },
          });

          console.log({ data });

          setFormData(data.result);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [id]);

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Category</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attribute-groups">Attribute Groups</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <EditGeneralCategoryForm
            categoryID={id.toString()}
            setFormData={setFormData}
            formData={formData}
          />
        </TabsContent>
        <TabsContent value="attribute-groups">
          <EditAttributeCategoryForm
            categoryID={id.toString()}
            attributes={formData.attributes}
          />
        </TabsContent>
        <TabsContent value="filters">
          <EditFiltersCategoryForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
