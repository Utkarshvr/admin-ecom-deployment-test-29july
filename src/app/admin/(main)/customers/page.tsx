import CustomersTable from "@/components/admin/customers/table/CustomersTable";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1922",
      firstName: "Arun",
      lastName: "Kumar",
      email: "abcd.xyz@gmail.com",
      mobileNo: "123 456 789",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Customers</h1>
      <CustomersTable data={data} />
    </div>
  );
}
