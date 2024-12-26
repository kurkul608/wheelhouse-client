"use client";

import wishlistSvg from "@/app/_assets/wishlist.svg";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import wishlistDisableSvg from "@/app/_assets/wishlistDisable.svg";
import bucketSvg from "@/app/_assets/bucker.svg";
import shareButtonSvg from "@/app/_assets/shareButton.svg";
import Image from "next/image";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useMainButton } from "@/hooks/useMainButton";
import { useParams } from "next/navigation";
import { BucketContext } from "@/contexts/bucketContext";
import { addToBucket as addToBucketAction } from "@/actions/bucket/addTo";
import { addToWishlist as addToWishlistAction } from "@/actions/wishlist/addTo";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { getIsCarInBucket } from "@/utils/getIsCarInBucket";
import { deleteFromBucket } from "@/actions/bucket/deleteTo";
import { WishlistContext } from "@/contexts/wishlistContext";
import { deleteFromWishlist } from "@/actions/wishlist/deleteTo";
import { getIsCarInWishlist } from "@/utils/getIsCarInWishlist";
import { Snackbar } from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";

interface CarItemActionsProps {
  wishlistDefaultState?: boolean;
}

export const CarItemActions: FC<CarItemActionsProps> = ({
  wishlistDefaultState,
}) => {
  const [showBucketSnackBar, setShowBucketSnackBar] = useState({
    state: false,
    text: "",
  });
  const [showWishlistSnackBar, setShowWishlistSnackBar] = useState({
    state: false,
    text: "",
  });

  const [wishListSrc, setWishListSrc] = useState(
    wishlistDefaultState ? wishlistActiveSvg.src : wishlistSvg.src,
  );

  const params = useParams();
  const carId = params.slug;

  const { bucket, update: bucketUpdate } = useContext(BucketContext);
  const { wishlist, update: wishlistUpdate } = useContext(WishlistContext);

  useEffect(() => {
    const isCarCardInWishlist = getIsCarInWishlist(carId as string, wishlist);
    console.log(isCarCardInWishlist);
    if (isCarCardInWishlist) {
      setWishListSrc(wishlistActiveSvg.src);
    } else {
      setWishListSrc(wishlistSvg.src);
    }
  }, [carId, wishlist]);

  const lp = useLaunchParams();

  const addToWishList = async (ignoreShowSnackbar?: boolean) => {
    setWishListSrc(wishlistDisableSvg.src);
    const headers = getAuthorization(lp);
    const isCarCardInWishlist = getIsCarInWishlist(carId as string, wishlist);

    if (isCarCardInWishlist) {
      await deleteFromWishlist(carId as string, headers);
    } else {
      await addToWishlistAction(carId as string, headers);
    }

    if (!ignoreShowSnackbar) {
      setShowWishlistSnackBar({
        state: true,
        text: isCarCardInWishlist
          ? "Удалено из списока желаемого"
          : "Добавлено в список желаемого",
      });
    }

    if (wishlistUpdate) {
      await wishlistUpdate();
    }
  };

  const addToBucket = async (ignoreShowSnackbar?: boolean) => {
    const headers = getAuthorization(lp);
    await addToBucketAction(carId as string, headers);
    if (bucketUpdate) {
      await bucketUpdate();
    }

    if (!ignoreShowSnackbar) {
      setShowBucketSnackBar({
        state: true,
        text: "Добавлено в корзину",
      });
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
        onClick={() => {
          addToWishList();
        }}
      />
      <Image
        src={shareButtonSvg.src}
        alt={"share-button-icon"}
        width={16}
        height={16}
      />
      {showWishlistSnackBar.state && (
        <Snackbar
          before={
            <Image
              src={wishlistActiveSvg.src}
              alt={"wishlist-icon"}
              width={20}
              height={20}
            />
          }
          onClose={() => {
            setShowWishlistSnackBar({
              state: false,
              text: "",
            });
          }}
          after={
            <Snackbar.Button
              onClick={() => {
                addToWishList(true).then(() => {
                  setShowWishlistSnackBar({
                    state: false,
                    text: "",
                  });
                });
              }}
            >
              Отменить
            </Snackbar.Button>
          }
          link={
            <Link href={"/wishlist"} className={"size-3"}>
              Открыть список желаемого
            </Link>
          }
        >
          <div className={"size-4 w-full"}>{showWishlistSnackBar.text}</div>
        </Snackbar>
      )}
      {showBucketSnackBar.state && (
        <Snackbar
          before={
            <Image
              src={bucketSvg.src}
              alt={"bucket-icon"}
              width={20}
              height={20}
            />
          }
          onClose={() => {
            setShowBucketSnackBar({
              state: false,
              text: "",
            });
          }}
          link={
            <Link href={"/bucket"} className={"size-3"}>
              Открыть корзину
            </Link>
          }
        >
          <div className={"size-4 w-full"}>{showBucketSnackBar.text}</div>
        </Snackbar>
      )}
    </div>
  );
};
