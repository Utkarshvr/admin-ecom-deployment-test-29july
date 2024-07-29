"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { AttributeType } from "@/types/admin/types";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

type Props = { attribute: AttributeType; loadAttributes: () => void };

export default function AttributeCard({ attribute, loadAttributes }: Props) {
  async function deleteAttribute(id: string) {
    try {
      await axiosInstance.delete(`/attributes/delete/${id}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      toast({ title: "Attribute deleted successfully" });
      loadAttributes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="min-w-[220px]">
      <CardHeader>
        <CardTitle>{attribute.groupName}</CardTitle>
      </CardHeader>
      <CardContent>
        {attribute.properties &&
          attribute.properties.map((prop) => <p>{prop}</p>)}
      </CardContent>
      <CardFooter className="items-center justify-center">
        <div className="flex gap-1">
          <Link href={`attributes/${attribute._id}`}>
            <Button variant="ghost" size="icon">
              <Edit size={18} />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="ghost" size="icon">
                <Trash size={18} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete it?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this attribute.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAttribute(attribute._id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
