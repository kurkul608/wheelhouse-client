"use client";

import { useContext, useState } from "react";
import { WishlistContext } from "@/contexts/wishlistContext";
import { getIsCarInWishlist } from "@/utils/getIsCarInWishlist";
import { getAuthorization } from "@/utils/getAuthorization";
import { deleteFromWishlist } from "@/actions/wishlist/deleteTo";
import { addToWishlist as addToWishlistAction } from "@/actions/wishlist/addTo";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Snackbar, Spinner } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import { Link } from "@/components/Link/Link";
import { Wishlilst } from "@/components/Icons/Wishlilst";
import { WishlilstFilled } from "@/components/Icons/WishlilstFilled";

export const WishlistButton = ({ carCardId }: { carCardId: string }) => {
  const [showWishlistSnackBar, setShowWishlistSnackBar] = useState({
    state: false,
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const { wishlist, update: wishlistUpdate } = useContext(WishlistContext);
  const isInWishlist = getIsCarInWishlist(carCardId, wishlist);

  const addToWishList = async (ignoreShowSnackbar?: boolean) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
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

    setIsLoading(false);

    if (wishlistUpdate) {
      await wishlistUpdate();
    }
  };

  const getWishListIcon = () =>
    isInWishlist ? <WishlilstFilled /> : <Wishlilst />;

  return (
    <div
      className={"border-l-2 pl-2"}
      onClick={async (e) => {
        e.stopPropagation();
        await addToWishList();
      }}
    >
      <div style={{ color: "var(--tgui--accent_text_color)" }}>
        {isLoading ? (
          <div className={"w-[24px] h-[24px]"}>
            <Spinner size="s" className={"w-[24px] h-[24px]"} />
          </div>
        ) : (
          getWishListIcon()
        )}
      </div>

      {showWishlistSnackBar.state && (
        <Snackbar
          before={
            <Image
              src={wishlistActiveSvg.src}
              alt={"bucket-icon"}
              width={20}
              height={20}
              unoptimized
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
