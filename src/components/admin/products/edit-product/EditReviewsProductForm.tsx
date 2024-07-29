import RatingStars from "@/components/common/RatingStars";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

type Props = {};

export default function EditReviewsProductForm({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-bold text-md">Average Rating: 4.5</h4>

      <div className="flex flex-col gap-1">
        <div className="max-w-[450px] flex gap-3">
          <Input placeholder="Search Reviews" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">Review Heading</h1>
            <Button
              size={"icon"}
              className="w-8 h-8 p-1"
              variant={"destructive"}
            >
              <Trash size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat
          ad ducimus numquam adipisci perferendis consequatur nostrum voluptate
          neque alias itaque repellat ea ratione a nemo aliquid dolorem,
          deleniti accusamus.
        </CardContent>

        <CardFooter>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">Julia Sophie</p>
            <RatingStars stars={4} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
