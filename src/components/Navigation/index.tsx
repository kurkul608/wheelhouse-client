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

  if (user?.roles.some((role) => role === "MANAGER")) {
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
          />
        }
        text={"Менеджер меню"}
      />,
    );
  }

  if (user?.roles.some((role) => role === "ADMIN")) {
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
          />
        }
        text={"Админ меню"}
      />,
    );
  }
  return (
    <nav
      className={
        "fixed bottom-0 w-full flex items-center justify-around gap-4 px-[18px] py-[9px] border-t-2"
      }
      style={{
        backgroundColor: "var(--tgui--bg_color)",
        borderColor: "var(--tgui--secondary_bg_color)",
      }}
    >
      {navElements}
    </nav>
  );
};
