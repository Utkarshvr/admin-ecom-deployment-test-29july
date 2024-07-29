import ProductsTable from "@/components/admin/products/table/ProductsTable";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/lib/axiosInstance";
import Link from "next/link";

const getProds = async () => {
  try {
    const res = await fetch(`${baseURL}/product/list`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
      },
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const data = await getProds();
  const products = data.products || [];

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Products</h1>

      <div className="flex justify-end">
        <Link href={"products/create"}>
          <Button>Create</Button>
        </Link>
      </div>

      <ProductsTable data={products} />
    </div>
  );
}
