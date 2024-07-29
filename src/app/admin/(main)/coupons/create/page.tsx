"use client";

import { useState, useEffect } from "react";
import FormItemWrapper from "@/components/common/FormItemWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector from "@/components/ui/extension/multiple-selector";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

export default function Page({}: Props) {
  const [productsOptions, setProductsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const [formState, setFormState] = useState<{
    couponName: string;
    couponCode: string;
    couponType: string;
    selectedProducts: { label: string; value: string }[];
    selectedCategories: { label: string; value: string }[];
    totalUsagLimit: number;
    discount: number;
    minCartValue: number;
    maxDiscount: number;
    totalUsageLimit: string;
    endDate: string;
    freeShipping: boolean;
    status: boolean;
    perCustomerUse: number;
  }>({
    couponName: "",
    couponCode: "",
    couponType: "",
    selectedProducts: [],
    selectedCategories: [],
    totalUsagLimit: 1,
    discount: 0,
    minCartValue: 0,
    maxDiscount: 0,
    totalUsageLimit: "",
    endDate: "",
    freeShipping: false,
    status: true,
    perCustomerUse: 0,
  });

  async function loadProducts() {
    try {
      const res = await fetch(`${baseURL}/product/list`, {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      const data = await res.json();
      const PRODUCTS = data.products || [];
      setProductsOptions(
        PRODUCTS.map((p: any) => ({ label: p.name, value: p._id }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch(`${baseURL}/category/list`, {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      const data = await res.json();
      const CATEGORIES = data.resp || [];
      setCategoriesOptions(
        CATEGORIES.map((c: any) => ({ label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  const router = useRouter();

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formState);
    const body = {
      name: formState.couponName,
      code: formState.couponCode,
      couponType: formState.couponType,
      freeShipping: formState.freeShipping,
      discount: Number(formState.discount),
      totalUsagLimit: Number(formState.totalUsagLimit),
      minCartValue: Number(formState.minCartValue),
      perCoustmerUser: Number(formState.perCustomerUse),
      maxDiscount: Number(formState.maxDiscount),
      status: formState.status,
      categoryId: formState.selectedCategories.map((e) => e.value),
      productId: formState.selectedProducts.map((e) => e.value),
    };

    try {
      const res = await fetch(`${baseURL}/coupon/create`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      if (res.ok) {
        toast({ title: "Coupon created successfully!" });
        router.replace("/admin/coupons");
      } else {
        toast({ title: "Coupon not crated!", variant: "destructive" });
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Coupon</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="flex-[0.5] flex flex-col gap-3">
              <FormItemWrapper label="Coupon Name">
                <Input
                  name="couponName"
                  placeholder="Coupon Name"
                  value={formState.couponName}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Coupon Code">
                <Input
                  name="couponCode"
                  placeholder="Coupon Code"
                  value={formState.couponCode}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Coupon Type">
                <Input
                  name="couponType"
                  placeholder="Coupon Type"
                  value={formState.couponType}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Products">
                <MultipleSelector
                  options={productsOptions}
                  value={formState.selectedProducts}
                  onChange={(options) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      selectedProducts: options,
                    }))
                  }
                  placeholder="Select Products"
                />
              </FormItemWrapper>
              <FormItemWrapper label="Categories">
                <MultipleSelector
                  options={categoriesOptions}
                  value={formState.selectedCategories}
                  onChange={(options) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      selectedCategories: options,
                    }))
                  }
                  placeholder="Select Categories"
                />
              </FormItemWrapper>
              <FormItemWrapper label="Discount">
                <Input
                  name="discount"
                  placeholder="Discount"
                  type="number"
                  value={formState.discount}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Min Cart Value">
                <Input
                  name="minCartValue"
                  placeholder="Min Cart Value"
                  type="number"
                  value={formState.minCartValue}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Max Discount">
                <Input
                  name="maxDiscount"
                  placeholder="Max Discount"
                  type="number"
                  value={formState.maxDiscount}
                  onChange={handleChange}
                />
              </FormItemWrapper>
            </div>
            <div className="flex-[0.5] flex flex-col gap-3">
              <FormItemWrapper label="Total Usage Limit">
                <Input
                  name="totalUsageLimit"
                  placeholder="Total Usage Limit"
                  value={formState.totalUsageLimit}
                  onChange={handleChange}
                  type="number"
                />
              </FormItemWrapper>
              <FormItemWrapper label="End Date">
                <Input
                  name="endDate"
                  placeholder="End Date"
                  value={formState.endDate}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <FormItemWrapper label="Per Customer Use">
                <Input
                  name="perCustomerUse"
                  placeholder="Per Customer Use"
                  value={formState.perCustomerUse}
                  onChange={handleChange}
                />
              </FormItemWrapper>
              <div className="flex gap-2">
                <Checkbox
                  id="free-shipping"
                  name="freeShipping"
                  checked={formState.freeShipping}
                  onCheckedChange={(checked: boolean) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      freeShipping: checked,
                    }))
                  }
                />
                <label
                  htmlFor="free-shipping"
                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Free Shipping
                </label>
              </div>
              <div className="flex gap-2">
                <Checkbox
                  id="status"
                  name="freeShipping"
                  checked={formState.status}
                  onCheckedChange={(checked: boolean) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      status: checked,
                    }))
                  }
                />
                <label
                  htmlFor="status"
                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Status
                </label>
              </div>
            </div>
          </div>
          <Button className="w-max" type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
