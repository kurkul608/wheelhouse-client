"use client";

import "./navigation.css";
import mainSvg from "@/app/_assets/main.svg";
import bucketSvg from "@/app/_assets/bucket.svg";
import wishlistSvg from "@/app/_assets/wishlist.svg";
import { NavigationIcon } from "@/components/Navigation/NavigationIcon";

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
        svrSrc={mainSvg.src}
        text={"Главная"}
      />
      <NavigationIcon
        href={`/bucket`}
        svrSrc={bucketSvg.src}
        text={"Корзина"}
      />
      <NavigationIcon
        href={`/wishlist`}
        svrSrc={wishlistSvg.src}
        text={"Избранное"}
      />
    </nav>
  );
};
