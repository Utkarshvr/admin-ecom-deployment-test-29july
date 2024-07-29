import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}

export default function EditGeneralProductForm({}: Props) {
  return (
    <div className="flex gap-[36px]">
      <div className="flex flex-[0.5] flex-col gap-3">
        <Wrapper>
          <Label>Product Name</Label>
          <Input type="text" placeholder="T-Shirt" />
        </Wrapper>
        <Wrapper>
          <Label>Parent Categories</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Parent Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volvo">Volvo</SelectItem>
              <SelectItem value="toyata">Toyata</SelectItem>
            </SelectContent>
          </Select>
        </Wrapper>
        <Wrapper>
          <Label>Breif Description</Label>
          <Input type="text" placeholder="Some description here" />
        </Wrapper>
        <Wrapper>
          <Label>Full Description</Label>
          <Input type="text" placeholder="Some description here" />
        </Wrapper>
        <Wrapper>
          <Label>Max Retail Price</Label>
          <Input type="text" placeholder="Some description here" />
        </Wrapper>
        <Wrapper>
          <Label>Minimum Order Quantity</Label>
          <Input type="text" placeholder="Some description here" />
        </Wrapper>
      </div>
      <div className="flex flex-[0.5] flex-col gap-3">
        <Wrapper>
          <Label>Shipping Price</Label>
          <Textarea placeholder="Some description here." />
        </Wrapper>
        <Wrapper>
          <Label>Product Status</Label>
          <Textarea placeholder="Some description here." />
        </Wrapper>
        <Wrapper>
          <Label>Meta Tag Title</Label>
          <Textarea placeholder="Disabled" />
        </Wrapper>
        <Wrapper>
          <Label>Meta Tag Keyword</Label>
          <Textarea placeholder="Disabled" />
        </Wrapper>
        <Wrapper>
          <Label>Meta Tag Description</Label>
          <Textarea placeholder="desc..." />
        </Wrapper>
        <Wrapper>
          <Label>Quantity in Stock</Label>
          <Textarea placeholder="desc..." />
        </Wrapper>
      </div>
    </div>
  );
}
