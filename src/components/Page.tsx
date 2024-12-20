"use client";

import { backButton } from "@telegram-apps/sdk-react";
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
        router.back();
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [router, isBackButtonMounted]);

  return <>{children}</>;
}
