import TransactionsTable from "@/components/admin/transactions/table/TransactionsTable";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Paid",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Paid",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Paid",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Pending",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Refunded",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Paid",
    },
    {
      transactionId: "1234",
      orderId: "122",
      customerId: "122",
      timeStrap: "123.456.789",
      paymentMode: "Cash on Delivery",
      status: "Cancelled",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Transactions</h1>
      <TransactionsTable data={data} />
    </div>
  );
}
