"use client";

import { FC } from "react";
import Slider, { Settings } from "react-slick";
import "./PhotoGallery.css";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

interface PhotoGalleryPros {
  photoUrls?: string[];
}
export const PhotoGallery: FC<PhotoGalleryPros> = ({ photoUrls }) => {
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots photo-gallery-dots",
    className: "photo-gallery ",
  };

  return (
    <Slider {...settings}>
      {photoUrls?.map((photoUrl) => (
        <ImageWithSkeleton
          src={photoUrl}
          alt={photoUrl}
          width={340}
          height={250}
          className="object-cover w-auto h-full"
          wrapperClassName={
            // "max-w-full h-[250px] overflow-hidden flex items-center justify-center"
            "max-w-full max-h-[225px] overflow-hidden flex items-center justify-center"
          }
          key={photoUrl}
        />
      ))}
    </Slider>
  );
};
