"use client";

import wishlistSvg from "@/app/_assets/wishlist.svg";
import wishlistActiveSvg from "@/app/_assets/wishlistActive.svg";
import wishlistDisableSvg from "@/app/_assets/wishlistDisable.svg";
import shareButtonSvg from "@/app/_assets/shareButton.svg";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { addToWishlist as addToWishlistAction } from "@/actions/wishlist/addTo";
import {
  useLaunchParams,
  shareURL,
  requestContact,
} from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { WishlistContext } from "@/contexts/wishlistContext";
import { deleteFromWishlist } from "@/actions/wishlist/deleteTo";
import { getIsCarInWishlist } from "@/utils/getIsCarInWishlist";
import { Snackbar } from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";
import { writeToClipboard } from "@/utils/writeToClipboard";
import { getMiniAppLink } from "@/utils/getMiniAppLink";
import { createOrder } from "@/actions/order/create";
import { MainButton } from "@/components/MainButton";
import { RequestedContact } from "@telegram-apps/sdk";
import { UserContext } from "@/contexts/userContext";
import { Modal } from "@/components/Modal";
import { SelectRef } from "@/components/CarCardItem/SelectRef";

interface CarItemActionsProps {
  wishlistDefaultState?: boolean;
  isRequestAlreadySend: boolean;
  existMainButtonText?: string | null;
}

export const CarItemActions: FC<CarItemActionsProps> = ({
  wishlistDefaultState,
  isRequestAlreadySend,
  existMainButtonText,
}) => {
  const [isSelectRefModal, setIsSelectRefModal] = useState(false);
  const [mainButtonText, setMainButtonText] = useState(
    "Нажать, чтобы менеджер связался с вами",
  );
  const { user } = useContext(UserContext);
  const [isRequestSend, setIsRequestSend] = useState(isRequestAlreadySend);
  const [loader, setLoader] = useState(false);
  const [showClipBoard, setShowClipBoard] = useState({
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

  const { wishlist, update: wishlistUpdate } = useContext(WishlistContext);

  useEffect(() => {
    const isCarCardInWishlist = getIsCarInWishlist(carId as string, wishlist);
    if (isCarCardInWishlist) {
      setWishListSrc(wishlistActiveSvg.src);
    } else {
      setWishListSrc(wishlistSvg.src);
    }
  }, [carId, wishlist]);

  useEffect(() => {
    if (isRequestAlreadySend && !isRequestSend) {
      setIsRequestSend(true);
    }
  }, [isRequestAlreadySend]);

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

  const isUserRoleAdmin = user?.roles.some((role) => role === "ADMIN");

  console.log(isSelectRefModal);

  const shareClick = async (refId?: string) => {
    const res = await writeToClipboard(
      getMiniAppLink({ carId: carId as string }),
    );

    shareURL(getMiniAppLink({ carId: carId as string, refId }));

    if (res) {
      setShowClipBoard({
        text: "Скопировано в буфер обмена",
        state: true,
      });
    } else {
      setShowClipBoard({
        text: "Не удалось скопировать в буфер обмена",
        state: true,
      });
    }

    if (isSelectRefModal) {
      setIsSelectRefModal(false);
    }
  };

  const sendUserRequest = async () => {
    if (!isRequestSend) {
      try {
        setLoader(true);
        let contact: null | RequestedContact = null;
        if (requestContact.isAvailable() && requestContact.isSupported()) {
          contact = await requestContact();
        }
        if (contact) {
          await createOrder(
            carId as string,
            false,
            contact.contact,
            getAuthorization(lp),
          );
          setMainButtonText("Менеджер свяжится с вами в ближайшее время!");
          setIsRequestSend(true);
        }
        setLoader(false);
      } catch (error) {
        console.log("error: ", error);
        setLoader(false);
      }
    }
  };

  return (
    <div
      className={"flex gap-2 top-[8px] right-[10px] absolute"}
      id={"car-filters"}
    >
      <MainButton
        text={existMainButtonText ?? mainButtonText}
        disabled={isRequestSend}
        progress={loader}
        textColor={"#FFFFFF"}
        color={isRequestSend ? "#22BB33" : "#f73c00"}
        onClick={sendUserRequest}
      />
      <Image
        src={wishListSrc}
        alt={"wishlist-icon"}
        width={16}
        height={16}
        onClick={() => {
          addToWishList();
        }}
        unoptimized
      />
      <Image
        src={shareButtonSvg.src}
        alt={"share-button-icon"}
        onClick={() => {
          if (isUserRoleAdmin) {
            setIsSelectRefModal(true);
          } else {
            shareClick();
          }
        }}
        width={16}
        height={16}
        unoptimized
      />
      <Modal
        isOpen={isSelectRefModal}
        onClose={() => {
          setIsSelectRefModal(false);
        }}
        elementId={"car-filters"}
      >
        <SelectRef shareClick={shareClick} />
      </Modal>
      {showWishlistSnackBar.state && (
        <Snackbar
          before={
            <Image
              src={wishlistActiveSvg.src}
              alt={"wishlist-icon"}
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
      {showClipBoard.state && (
        <Snackbar
          onClose={() => {
            setShowClipBoard({
              state: false,
              text: "",
            });
          }}
        >
          <div className={"size-4 w-full"}>{showClipBoard.text}</div>
        </Snackbar>
      )}
    </div>
  );
};
