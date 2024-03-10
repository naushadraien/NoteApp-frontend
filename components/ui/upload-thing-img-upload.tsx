"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "./button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadThingImg({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  return (
    <main>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => onChange(res[0].url)}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
        className="mt-4 ut-button:bg-red-500 ut-button:ut-uploading:bg-red-500  ut-button:ut-readying:bg-red-500/50 ut-label:text-red-500 ut-upload-icon:text-red-500 ut-allowed-content:text-gray-500"
      />
    </main>
  );
}
