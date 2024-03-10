"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClientUploadedFileData } from "uploadthing/types";

export default function Upload() {
  const [images, setImages] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[] | null
  >(null);

  const [video, setVideo] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[] | null
  >(null);
  const [pdf, setPdf] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[] | null
  >(null);
  const onImageUploadComplete = (
    res: ClientUploadedFileData<{
      uploadedBy: string;
    }>[]
  ) => {
    if (res.length) {
      console.log(res);
      setImages(res);

      toast.success("Upload Completed");
    }
  };
  const onVideoUploadComplete = (
    res: ClientUploadedFileData<{
      uploadedBy: string;
    }>[]
  ) => {
    if (res.length) {
      console.log(res);
      setVideo(res);

      toast.success("Upload Completed");
    }
  };
  const onPdfUploadComplete = (
    res: ClientUploadedFileData<{
      uploadedBy: string;
    }>[]
  ) => {
    if (res.length) {
      console.log(res);
      setPdf(res);

      toast.success("Upload Completed");
    }
  };
  //   console.log("images", images);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => onImageUploadComplete(res)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      {images ? (
        images.map((image) => (
          <Image
            src={image.url}
            key={image.url}
            width={23}
            height={23}
            alt="Images"
          />
        ))
      ) : (
        <div>No images Uploaded</div>
      )}
      <UploadDropzone
        endpoint="videoUploader"
        onClientUploadComplete={(res) => onVideoUploadComplete(res)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => onPdfUploadComplete(res)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
