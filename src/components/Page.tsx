"use client";

import { backButton, mainButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();
  const [isBackButtonMounted, setIsBackButtonMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (backButton?.isMounted()) {
        setIsBackButtonMounted(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isBackButtonMounted) {
      if (back) {
        backButton.show();
      } else {
        backButton.hide();
      }
    }
  }, [back, isBackButtonMounted]);

  useEffect(() => {
    if (isBackButtonMounted) {
      const unsubscribe = backButton.onClick(() => {
        if (mainButton.isMounted() && mainButton.isVisible()) {
          mainButton.setParams({ isVisible: false });
          mainButton.onClick(() => {});
        }
        router.back();
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [router, isBackButtonMounted]);

  return <div className={"pb-[62px]"}>{children}</div>;
}
