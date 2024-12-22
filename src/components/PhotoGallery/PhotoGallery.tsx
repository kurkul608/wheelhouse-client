"use client";

import { FC } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";

interface PhotoGalleryPros {
  photoUrls: string[];
}
export const PhotoGallery: FC<PhotoGalleryPros> = ({ photoUrls }) => {
  return (
    <div className={"h-full"}>
      <div>1</div>
      <Carousel>
        {photoUrls.map((photoUrl) => (
          <Image
            src={photoUrl}
            alt={photoUrl}
            key={photoUrl}
            width={340}
            height={250}
          />
        ))}
      </Carousel>
      <div>2</div>
    </div>
  );
};
