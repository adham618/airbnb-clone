"use client";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import * as React from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleUpload = React.useCallback(
    (result: { info: { secure_url: string } }) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="xnzokvpu"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            className="relative flex flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            <span className="text-lg font-semibold">Upload a photo</span>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={value}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Uploaded Image"
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
