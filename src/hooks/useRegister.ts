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
import { IStartParams } from "@/utils/getMiniAppLink";
import { AxiosHeaders } from "axios";

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
    let refId: null | string = null;
    if (lp && lp.startParam) {
      const decodedDataString = atob(lp.startParam);
      const decodedData = JSON.parse(decodedDataString) as IStartParams;
      console.log("decodedData.refId: ", decodedData.refId);
      if (decodedData.refId) {
        refId = decodedData.refId;
      }
    }

    const user: User | undefined = await registerUser(
      { refId },
      headers as AxiosHeaders,
    );

    if (user) {
      setUser(user);

      const bucket = await getBucket(user.id, headers);

      if (bucket) setBucket(bucket);

      const wishlist = await getWishlist(user.id, headers);

      if (wishlist) setWishlist(wishlist);
    }
  };

  useEffect(() => {
    register();
  }, []);

  return [user, bucket, wishlist, register];
};
