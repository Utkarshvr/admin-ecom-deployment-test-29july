import StatusBadge from "@/components/admin/transactions/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {};

function Wrapper({ children, label }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-row gap-2">
      <p className="font-bold">{label}: </p>
      {children}
    </div>
  );
}

export default function page({}: Props) {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-4">Transaction Details</h1>

      <Card>
        <CardHeader>Transaction Details</CardHeader>

        <CardContent className="flex flex-col gap-4">
          {[
            { label: "Transaction ID", value: "2331" },
            { label: "Transaction Timestamp", value: "2022-10-0811:28:08" },
            { label: "Transaction Mode", value: "Cash On Delivery" },
            { label: "Transaction Status", value: "Paid", isBadge: true },
            { label: "Amount", value: "455" },
            { label: "Order ID", value: "1" },
            { label: "Customer ID", value: "3" },
            { label: "Customer Name", value: "Name" },
            { label: "IP Address", value: "::1" },
            {
              label: "Browser",
              value:
                "Maxilla/5.0 (Windows NT 10.0; VvIn64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
            },
          ].map((e) => (
            <Wrapper label={e.label}>
              {e.isBadge ? <StatusBadge status={e.value} /> : <p>{e.value}</p>}
            </Wrapper>
          ))}
        </CardContent>

        <CardFooter>
          <Button className="m-auto">
            Mark transaction as payment received
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
