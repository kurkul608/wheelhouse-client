import { createContext } from "react";
import { Bucket } from "@/models/bucket";

export const BucketContext = createContext<{
  bucket: Bucket | null;
  update: null | (() => Promise<void>);
}>({ bucket: null, update: null });
