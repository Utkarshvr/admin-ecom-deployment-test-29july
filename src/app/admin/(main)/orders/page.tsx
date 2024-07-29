import OrdersTable from "@/components/admin/orders/table/OrdersTable";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: "12345",
      customerID: "53221",
      createdAt: "08/12/2022 11:28PM",
      value: "1455",
      status: "pending",
      items: 2,
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-2">Orders</h1>
      <OrdersTable data={data} />
    </div>
  );
}
