import { Badge } from "@/components/ui/badge";
import React from "react";

type Props = { status: string };

export default function StatusBadge({ status }: Props) {
  let backgroundColor = "#000";

  switch (status) {
    case "Paid":
      backgroundColor = "#12B76A";
      break;
    case "Pending":
      backgroundColor = "#B66D00";
      break;
    case "Refunded":
      backgroundColor = "#344054";
      break;
    case "Cancelled":
      backgroundColor = "#F04438";
      break;

    default:
      break;
  }

  return (
    <>
      <Badge variant={"default"} className="w-max" style={{ backgroundColor }}>
        {status}
      </Badge>
    </>
  );
}
