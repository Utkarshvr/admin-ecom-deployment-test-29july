import FormItemWrapper from "@/components/common/FormItemWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-4">Process Order - {112332}</h1>
      <div className="mb-4 flex gap-4">
        <div className="self-stretch flex-[0.5]">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>Order Details</CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-[0.5] flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="font-bold">Order ID</p>
                    {/* <p>d89329x12</p> */}
                  </div>
                  <p className="font-bold">Timestamp</p>
                  <p className="font-bold">Transaction ID</p>
                  <p className="font-bold">Amount</p>
                  <p className="font-bold">Delivery Charges</p>
                  <p className="font-bold">Coupons Code</p>
                </div>
                <div className="flex-[0.5] flex flex-col gap-2">
                  <p className="font-bold">Coupon Discount</p>
                  <p className="font-bold">Customer ID</p>
                  <p className="font-bold">Customer Name</p>
                  <p className="font-bold">Number of Items</p>
                  <p className="font-bold">Order Status</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="m-auto">Update Order</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="self-stretch flex-[0.5] flex flex-col gap-2">
          <Card>
            <CardHeader>Delivery Address</CardHeader>
            <CardContent>
              <p className="text-sm">
                Charan P, Addr tint ROAD N04, APAN DANA COLONY, XY2 Colony,
                HYDERABAD, E Godavari District, TELANGANA, India, 502032, Phone:
                67868766868
              </p>
            </CardContent>
            <CardFooter>
              <Button className="m-auto"> Change Address</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>Billing Address</CardHeader>
            <CardContent>
              <p className="text-sm">
                Charan P, Addr tint ROAD N04, APAN DANA COLONY, XY2 Colony,
                HYDERABAD, E Godavari District, TELANGANA, India, 502032, Phone:
                67868766868
              </p>
            </CardContent>
            <CardFooter>
              <Button className="m-auto"> Change Address</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>Product Info</CardHeader>
        <CardContent>
          <div className="flex">
            <div className="flex-[0.55] flex items-center gap-4">
              <Image
                width={300}
                height={100}
                quality={100}
                // style={{ width: 120, height: 80 }}
                src={
                  "/cloth.png"
                  // "https://w7.pngwing.com/pngs/826/253/png-transparent-t-shirt-polo-shirt-clothing-sleeve-black-t-shirt-black-crew-neck-t-shirt-tshirt-fashion-cloth-thumbnail.png"
                }
                alt="Image"
              />

              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <p className="font-bold">Product Name</p>
                  <p>John Wills White Printed T-Shirt</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Options</p>
                  <p>Size : M; Sleeve: Half Sleeve</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Unit Price</p>
                  <p>44</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Order Quantity</p>
                  <p>23</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Shipping Price</p>
                  <p>45</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Order Status</p>
                  <p>pending</p>
                </div>
              </div>
            </div>
            <div className="flex-[0.45] flex flex-col gap-3">
              <FormItemWrapper label="Shipping  Details">
                <Input placeholder="Dimensions" />
              </FormItemWrapper>
              <FormItemWrapper label="Additional  Details">
                <Input placeholder="Dimensions" />
              </FormItemWrapper>
              <Button>Update Item Info</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
