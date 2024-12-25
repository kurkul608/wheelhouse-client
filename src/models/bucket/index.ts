import { CarCard } from "@/models/carCard";

export interface BucketCarCard {
  id: string;
  bucketId: string;
  carCardId: string;
  addedAt: string;
  updatedAt: string;
  carCard: CarCard;
}

export interface Bucket {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  BucketCarCard: BucketCarCard[];
}
