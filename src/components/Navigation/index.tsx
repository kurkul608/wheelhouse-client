"use client";

import { NavigationIcon } from "@/components/Navigation/NavigationIcon";
import {
  MainSvg,
  WishlistSvg,
} from "@/components/Navigation/NavigationIcon/Icons";

export const Navigation = () => {
  const autoSearchParams = new URLSearchParams({
    page: "0",
  });
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
      <NavigationIcon
        href={`/cars?${autoSearchParams.toString()}`}
        icon={<MainSvg />}
        text={"Главная"}
      />
      <NavigationIcon
        href={`/wishlist`}
        icon={<WishlistSvg />}
        text={"Избранное"}
      />
    </nav>
  );
};
