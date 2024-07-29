import CategoriesTable from "@/components/admin/categories/CategoriesTable/CategoriesTable";

async function getData(): Promise<{ resp: any[] } | null> {
  try {
    const res = await fetch(`http://13.202.157.9/api/category/list`, {
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
    return null;
  }
}

export default async function DemoPage() {
  const data = await getData();
  console.log({ data });
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Categories</h1>
      {data?.resp && <CategoriesTable data={data.resp} />}
    </div>
  );
}
