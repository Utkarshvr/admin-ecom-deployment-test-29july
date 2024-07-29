import CouponCard from "@/components/admin/coupons/card/CouponCard";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/lib/axiosInstance";
import Link from "next/link";

const getCoupons = async () => {
  try {
    const res = await fetch(`${baseURL}/coupon/list`, {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
      },
      next: {
        tags: ["coupons-list"],
      },
      cache: "no-cache",
    });
    const data = await res.json();
    console.log({ res });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function page() {
  const data = await getCoupons();
  const coupons = data?.couponList || [];
  console.log({ data });

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Coupons</h1>

      <div className="flex justify-end">
        <Link href={"coupons/create"}>
          <Button>Create</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {coupons.map((coupon: any) => (
          <div key={coupon._id}>
            <CouponCard coupon={coupon} />
          </div>
        ))}
      </div>
    </div>
  );
}
