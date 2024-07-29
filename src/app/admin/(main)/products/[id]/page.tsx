import EditAttributesProductForm from "@/components/admin/products/edit-product/EditAttributesProductForm";
import EditDiscountProductForm from "@/components/admin/products/edit-product/EditDiscountProductForm";
import EditGeneralProductForm from "@/components/admin/products/edit-product/EditGeneralProductForm";
import EditImagesProductForm from "@/components/admin/products/edit-product/EditImagesProductForm";
import EditOptionsProductForm from "@/components/admin/products/edit-product/EditOptionsProductForm";
import EditReviewsProductForm from "@/components/admin/products/edit-product/EditReviewsProductForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <EditGeneralProductForm />
        </TabsContent>
        <TabsContent value="attributes">
          <EditAttributesProductForm />
        </TabsContent>
        <TabsContent value="options">
          <EditOptionsProductForm />
        </TabsContent>
        <TabsContent value="discount">
          <div className="w-full h-full flex items-center justify-center">
            <EditDiscountProductForm />
          </div>
        </TabsContent>
        <TabsContent value="images">
          <EditImagesProductForm />
        </TabsContent>
        <TabsContent value="reviews">
          <EditReviewsProductForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
