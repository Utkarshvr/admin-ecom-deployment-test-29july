"use client";

import FormItemWrapper from "@/components/common/FormItemWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { baseURL } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function EditDiscountProductForm({}: Props) {
  const { id } = useParams();

  const [formState, setFormState] = useState({
    offerPrice: "",
    offerStartTime: "",
    offerEndTime: "",
  });

  console.log(formState);
  async function createOffer() {
    const res = await fetch(`${baseURL}/product/set-offer/${id}`, {
      method: "PUT",
      body: JSON.stringify(formState),
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
      },
    });
    console.log(await res.json());
    if (!res.ok)
      toast({
        title: "Couldn't create offer. Please try again",
        variant: "destructive",
      });
    else
      toast({
        title: "Offer created successfully",
        variant: "default",
      });
  }

  return (
    <Card className="min-w-96">
      <CardHeader>Product Discount</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <FormItemWrapper label="Offer Price">
            <Input
              placeholder="130"
              value={formState.offerPrice}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  offerPrice: e.target.value,
                }))
              }
            />
          </FormItemWrapper>
          <FormItemWrapper label="Offer Start Time">
            <Input
              placeholder="Start Date"
              type="date"
              value={formState.offerStartTime}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  offerStartTime: e.target.value,
                }))
              }
            />
          </FormItemWrapper>
          <FormItemWrapper label="Offer End Time">
            <Input
              placeholder="End Date"
              type="date"
              value={formState.offerEndTime}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  offerEndTime: e.target.value,
                }))
              }
            />
          </FormItemWrapper>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={createOffer} className="m-auto">
          Set Discount
        </Button>
      </CardFooter>
    </Card>
  );
}
