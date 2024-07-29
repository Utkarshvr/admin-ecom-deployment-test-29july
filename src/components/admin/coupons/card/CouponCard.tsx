"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Edit, Trash, MoreHorizontal, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CouponType } from "@/types/admin/types";
import Link from "next/link";
import { baseURL } from "@/lib/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { revalidateTag } from "next/cache";

type Props = { coupon: CouponType };

export default function CouponCard({ coupon }: Props) {
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  async function deleteCoupon() {
    const res = await fetch(`${baseURL}/coupon/delete/${coupon._id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
      },
    });
    if (res.ok) {
      toast({ title: "Coupon deleted successfully" });
      router.refresh();
      // revalidateTag("coupons-list");
    }
  }

  return (
    <Card className="min-w-[220px]">
      <CardHeader className="flex-row  gap-4 justify-between items-center">
        <CardTitle>{coupon.name}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`coupons/${coupon._id}`}>
              <DropdownMenuItem>
                <Edit size={18} className="mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={deleteCoupon}>
              <Trash size={18} className="mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <p className="mb-2 text-sm font-bold text-green-600">
          {"-"}
          {coupon.discount}
          {"%"}
        </p>

        <div className="mb-2 flex items-center gap-4 dark:bg-slate-900 border bg-slate-200 dark:border-slate-800 border-slate-300 w-max rounded-md pl-2 pr-1 py-1">
          <p className="text-xs font-bold">{coupon.code}</p>
          <Button
            onClick={() => {
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 1000);

              navigator.clipboard.writeText(coupon.code);
              toast({
                title: "Coupon Code copied to clipboard",
                duration: 1000,
              });
            }}
            variant="secondary"
            className="w-6 h-6 p-1.5"
            size="icon"
          >
            {!isCopied ? <Copy size={16} /> : <Check size={16} />}
          </Button>
        </div>

        <p className="text-sm">
          <span className="text-sm dark:text-neutral-400 text-neutral-500">
            Expires on:{" "}
          </span>
          {new Date(coupon.endDate).toDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
