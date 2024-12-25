"use client";

import wishlistSvg from "@/app/_assets/wishlist.svg";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import wishlistDisableSvg from "@/app/_assets/wishlistDisable.svg";
import wishlistButtonSvg from "@/app/_assets/shareButton.svg";
import Image from "next/image";
import { FC, useContext, useMemo, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { useMainButton } from "@/hooks/useMainButton";
import { useParams } from "next/navigation";
import { BucketContext } from "@/contexts/bucketContext";
import { addToBucket as addToBucketAction } from "@/actions/bucket/addTo";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { getIsCarInBucket } from "@/utils/getIsCarInBucket";
import { deleteFromBucket } from "@/actions/bucket/deleteTo";

interface CarItemActionsProps {
  wishlistDefaultState?: boolean;
}

export const CarItemActions: FC<CarItemActionsProps> = ({
  wishlistDefaultState,
}) => {
  const [wishListSrc, setWishListSrc] = useState(
    wishlistDefaultState ? wishlistActiveSvg.src : wishlistSvg.src,
  );

  const params = useParams();
  const carId = params.slug;

  const { user } = useContext(UserContext);
  const { bucket, update: bucketUpdate } = useContext(BucketContext);

  const lp = useLaunchParams();

  // console.log(bucket);
  // console.log(bucketUpdate);

  const addToWishList = () => {
    console.log("user: ", user);
    console.log("add to wishlist: ", carId);
  };

  const addToBucket = async () => {
    const headers = getAuthorization(lp);
    await addToBucketAction(carId as string, headers);
    if (bucketUpdate) {
      await bucketUpdate();
    }
  };

  const removeFromBucket = async () => {
    const headers = getAuthorization(lp);
    await deleteFromBucket(carId as string, headers);
    if (bucketUpdate) {
      await bucketUpdate();
    }
  };

  const isCarInBucket = useMemo(
    () => getIsCarInBucket(carId as string, bucket),
    [bucket, carId],
  );

  useMainButton({
    main: isCarInBucket ? false : !!carId,
    text: isCarInBucket ? "Убрать из корзины" : "Добавить в корзину",
    ...(isCarInBucket ? {} : {}),
    backgroundColor: isCarInBucket
      ? lp.themeParams.hintColor
      : lp.themeParams.buttonColor,
    mainButtonOnClick: isCarInBucket ? removeFromBucket : addToBucket,
  });

  return (
    <div className={"flex gap-2 top-[8px] right-[10px] absolute"}>
      <Image
        src={wishListSrc}
        alt={"wishlist-icon"}
        width={16}
        height={16}
        onClick={addToWishList}
      />
      <Image
        src={wishlistButtonSvg.src}
        alt={"share-button-icon"}
        width={16}
        height={16}
      />
    </div>
  );
};
