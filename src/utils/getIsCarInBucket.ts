import { Bucket } from "@/models/bucket";

export const getIsCarInBucket = (carId: string, bucket: Bucket | null) =>
  bucket?.BucketCarCard?.some((bucketCard) => bucketCard.carCardId === carId);
