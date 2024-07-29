"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Download,
  MinusCircle,
  Paperclip,
  PlusCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/extension/file-upload";
import FileSvgDraw from "@/components/common/FileSvgDraw";
import { baseURL } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
type Props = {};

const FileUploaderTest = ({
  files,
  setFiles,
}: {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}) => {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    // multiple: true,
  };
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <div className="flex flex-col gap-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={240}
                height={120}
                className="size-20 p-0 w-full h-full"
              />
              <FileUploaderItem key={i} index={i}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            </div>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default function EditImagesProductForm({}: Props) {
  const { id } = useParams();

  const [files, setFiles] = useState<File[] | null>(null);

  async function handleSubmit() {
    if (!files || files.length === 0) return;

    const formdata = new FormData();
    formdata.append("image", files[0]);
    formdata.append("productName", "Product XYZ");
    formdata.append("order", "1");

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    const res = await fetch(`${baseURL}/product/add-image/${id}`, {
      method: "PUT",
      // body: JSON.stringify({
      //   image: reader.result,
      // }),
      body: formdata,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
      },
    });
    console.log(res);
    if (!res.ok)
      toast({
        title: "Couldn't upload image. Please try again",
        variant: "destructive",
      });
    else
      toast({
        title: "Uploaded image successfully",
        variant: "default",
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm">Select Group</h4>
        <div className="max-w-[450px] flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"} size={"lg"}>
                <Upload className="mr-2" />
                Select Image/Video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogDescription>Desc...</DialogDescription>
              </DialogHeader>

              <FileUploaderTest files={files} setFiles={setFiles} />

              <DialogFooter>
                <Button onClick={handleSubmit} type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant={"secondary"} size={"sm"}>
            <Upload size={18} className="mr-2" />
            Sort Order
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            <PlusCircle size={18} className="mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-center rounded-tl-md rounded-tr-md p-0.5 dark:bg-slate-900 bg-slate-200 ">
            <Image
              alt="CLOTH"
              quality={100}
              src={"/cloth.png"}
              width={100}
              height={70}
            />
          </div>
          <div className="flex gap-4 rounded-bl-md rounded-br-md p-0.5 dark:bg-slate-800 bg-slate-300  justify-between items-center">
            <p className="text-sm">Sort Order: 1</p>
            <div className="flex gap-1 ">
              <Download color="#1089ff" size={18} />
              <MinusCircle color="#ff4f30" size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
