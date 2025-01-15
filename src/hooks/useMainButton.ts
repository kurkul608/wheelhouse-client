"use client";

import { mainButton, type RGB as RGBType } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

interface UseMainButtonProps {
  main: boolean;
  isLoaderVisible?: boolean;
  text: string;
  textColor?: RGBType;
  backgroundColor?: RGBType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainButtonOnClick?: (e: any) => void;
}
export const useMainButton = ({
  main,
  text,
  isLoaderVisible,
  textColor,
  backgroundColor,
  mainButtonOnClick,
}: UseMainButtonProps) => {
  const [isMainButtonMounted, setIsMainButtonMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainButton?.isMounted()) {
        setIsMainButtonMounted(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMainButtonMounted) {
      if (main) {
        mainButton.setParams({
          text: text,
          isEnabled: true,
          isVisible: true,
          hasShineEffect: true,
          isLoaderVisible,
          textColor,
          backgroundColor,
        });
        if (mainButtonOnClick) {
          mainButton.onClick(mainButtonOnClick);
        }
      } else {
        mainButton.setParams({
          text: text,
          isVisible: false,
          textColor: undefined,
          backgroundColor: undefined,
        });
      }
    }
  }, [
    main,
    isMainButtonMounted,
    text,
    backgroundColor,
    textColor,
    isLoaderVisible,
  ]);

  useEffect(() => {
    if (isMainButtonMounted) {
      const unsubscribe = mainButton.onClick(() => {
        mainButton.setParams({
          text: text,
          isVisible: false,
        });
        if (mainButtonOnClick) {
          mainButton.offClick(mainButtonOnClick);
        }
        // mainButton.
        // mainButton.unmount();
        // mainButton.mount();
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  });
};
