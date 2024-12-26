"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/user";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Bucket } from "@/models/bucket";
import { getBucket } from "@/actions/bucket/get";
import { registerUser } from "@/actions/user/register";
import { Wishlist } from "@/models/wishlist";
import { getWishlist } from "@/actions/wishlist/get";

export const useRegister = (): [
  User | null,
  Bucket | null,
  Wishlist | null,
  update: () => Promise<void>,
] => {
  const [user, setUser] = useState<User | null>(null);
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const lp = useLaunchParams();

  const headers = getAuthorization(lp);

  const register = async () => {
    const user: User = await registerUser(headers);

    setUser(user);

    const bucket = await getBucket(user.id, headers);

    setBucket(bucket);

    const wishlist = await getWishlist(user.id, headers);

    setWishlist(wishlist);
  };

  useEffect(() => {
    register();
  }, []);

  return [user, bucket, wishlist, register];
};
