"use client";

import { NavigationIcon } from "@/components/Navigation/NavigationIcon";
import {
  MainSvg,
  WishlistSvg,
} from "@/components/Navigation/NavigationIcon/Icons";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Image from "next/image";
import listSvg from "@/app/_assets/list.svg";
import { InlineButtons } from "@telegram-apps/telegram-ui";

export const Navigation = () => {
  const autoSearchParams = new URLSearchParams({
    page: "0",
  });

  const { user } = useContext(UserContext);
  const navElements = [
    <NavigationIcon
      key={"navigation-main"}
      href={`/cars?${autoSearchParams.toString()}`}
      icon={<MainSvg />}
      text={"Главная"}
    />,
    <NavigationIcon
      key={"navigation-wishlist"}
      href={`/wishlist`}
      icon={<WishlistSvg />}
      text={"Избранное"}
    />,
  ];

  if (
    user?.roles.some((role) => role === "MANAGER" || role === "SUPER_ADMIN")
  ) {
    navElements.push(
      <NavigationIcon
        key={"navigation-manager"}
        href={`/manager`}
        icon={
          <Image
            src={listSvg.src}
            alt={"listSvg icon"}
            width={24}
            height={24}
            unoptimized
          />
        }
        text={"Менеджер"}
      />,
    );
  }

  if (user?.roles.some((role) => role === "ADMIN" || role === "SUPER_ADMIN")) {
    navElements.push(
      <NavigationIcon
        key={"navigation-admin"}
        href={`/admin`}
        icon={
          <Image
            src={listSvg.src}
            alt={"listSvg icon"}
            width={24}
            height={24}
            unoptimized
          />
        }
        text={"Админ"}
      />,
    );
  }
  return (
    <InlineButtons
      mode="plain"
      className={"fixed bottom-0 w-full flex justify-center"}
      style={{
        backgroundColor: "var(--tgui--bg_color)",
        borderColor: "var(--tgui--secondary_bg_color)",
      }}
    >
      {navElements}
    </InlineButtons>
  );
};
