"use client";

import { mainButton, type RGB as RGBType } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

interface UseMainButtonProps {
  main: boolean;
  isLoaderVisible?: boolean;
  text: string;
  textColor?: RGBType;
  backgroundColor?: RGBType;
  mainButtonOnClick?: () => void;
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
        });
      }
    }
  }, [main, isMainButtonMounted, text]);

  useEffect(() => {
    if (isMainButtonMounted) {
      const unsubscribe = mainButton.onClick(() => {
        // router.back();
        mainButton.setParams({
          text: text,
          isVisible: false,
        });
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  });
};
