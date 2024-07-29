import CreateGeneralProductForm from "@/components/admin/products/create-product/CreateGeneralProductForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Create Product</h1>
      <CreateGeneralProductForm />
    </div>
  );
}
