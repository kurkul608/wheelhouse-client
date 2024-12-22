"use client";

import { FC } from "react";
import Image from "next/image";

interface PhotoGalleryPros {
  photoUrls: string[];
}
export const PhotoGallery: FC<PhotoGalleryPros> = ({ photoUrls }) => {
  return photoUrls.length ? (
    <Image
      src={photoUrls[0]}
      alt={photoUrls[0]}
      key={photoUrls[0]}
      width={340}
      height={250}
    />
  ) : null;
};
