"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { Skeleton } from "@/components/Skeleton";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  width: number;
  height: number;
}

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={wrapperClassName} style={{ position: "relative" }}>
      {loading && <Skeleton width={width} height={height} />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
        style={loading ? { display: "none" } : {}}
        priority
        className={className}
      />
    </div>
  );
};

export default ImageWithSkeleton;
