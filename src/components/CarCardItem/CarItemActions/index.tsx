"use client";

import wishlistSvg from "@/app/_assets/wishlist.svg";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import wishlistDisableSvg from "@/app/_assets/wishlistDisable.svg";
import bucketSvg from "@/app/_assets/bucket.svg";
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
  const [showWishlistSnackBar, setShowWishlistSnackBar] = useState({
    state: false,
    text: "",
  });

  const [wishListSrc, setWishListSrc] = useState(
    wishlistDefaultState ? wishlistActiveSvg.src : wishlistSvg.src,
  );

  const params = useParams();
  const carId = params.slug;

  const { wishlist, update: wishlistUpdate } = useContext(WishlistContext);

  useEffect(() => {
    const isCarCardInWishlist = getIsCarInWishlist(carId as string, wishlist);
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
          ? "Удалено из избранного"
          : "Добавлено в избранное",
      });
    }

    if (wishlistUpdate) {
      await wishlistUpdate();
    }
  };

  useMainButton({
    main: true,
    text: "Нажать, чтобы менеджер связался с вами",
    mainButtonOnClick: () => {
      "Кнпока для свзяи с менеджером";
    },
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
            <Link href={"/wishlist"} className={"text-xs"}>
              Открыть избранное
            </Link>
          }
        >
          <div className={"size-4 w-full"}>{showWishlistSnackBar.text}</div>
        </Snackbar>
      )}
    </div>
  );
};
