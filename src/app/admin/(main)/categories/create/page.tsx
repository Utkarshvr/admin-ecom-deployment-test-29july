import CreateAttributeCategoryForm from "@/components/admin/categories/create-category/CreateAttributeCategoryForm";
import CreateFiltersCategoryForm from "@/components/admin/categories/create-category/CreateFiltersCategoryForm";
import CreateGeneralCategoryForm from "@/components/admin/categories/create-category/CreateGeneralCategoryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Category</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attribute-groups">Attribute Groups</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <CreateGeneralCategoryForm />
        </TabsContent>
        <TabsContent value="attribute-groups">
          <CreateAttributeCategoryForm />
        </TabsContent>
        <TabsContent value="filters">
          <CreateFiltersCategoryForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
