"use client";

import { useContext, useState } from "react";
import { WishlistContext } from "@/contexts/wishlistContext";
import { getIsCarInWishlist } from "@/utils/getIsCarInWishlist";
import { getAuthorization } from "@/utils/getAuthorization";
import { deleteFromWishlist } from "@/actions/wishlist/deleteTo";
import { addToWishlist as addToWishlistAction } from "@/actions/wishlist/addTo";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Snackbar } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import { Link } from "@/components/Link/Link";

const WishlistSvg = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5m5 17c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278"
      ></path>
    </svg>
  );
};

export const WishlistButton = ({ carCardId }: { carCardId: string }) => {
  const [showWishlistSnackBar, setShowWishlistSnackBar] = useState({
    state: false,
    text: "",
  });
  const lp = useLaunchParams();
  const { wishlist, update: wishlistUpdate } = useContext(WishlistContext);
  const isInWishlist = getIsCarInWishlist(carCardId, wishlist);

  const addToWishList = async (ignoreShowSnackbar?: boolean) => {
    if (showWishlistSnackBar.state) {
      return;
    }
    const headers = getAuthorization(lp);
    const isCarCardInWishlist = getIsCarInWishlist(
      carCardId as string,
      wishlist,
    );

    if (isCarCardInWishlist) {
      await deleteFromWishlist(carCardId as string, headers);
    } else {
      await addToWishlistAction(carCardId as string, headers);
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

  return (
    <div
      className={"border-l-2 pl-2"}
      onClick={async (e) => {
        e.stopPropagation();
        await addToWishList();
      }}
    >
      <WishlistSvg
        color={
          isInWishlist
            ? "var(--tgui--destructive_text_color)"
            : "var(--tgui--accent_text_color)"
        }
      />

      {showWishlistSnackBar.state && (
        <Snackbar
          before={
            <Image
              src={wishlistActiveSvg.src}
              alt={"bucket-icon"}
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
