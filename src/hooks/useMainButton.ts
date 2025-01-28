"use client";

import { mainButton, type RGB as RGBType } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

interface UseMainButtonProps {
  isLoaderVisible?: boolean;
  textColor?: RGBType;
  backgroundColor?: RGBType;
}
export const useMainButton = ({
  isLoaderVisible,
  textColor,
  backgroundColor,
}: UseMainButtonProps) => {
  const [isMainButtonMounted, setIsMainButtonMounted] = useState(false);
  const [isShow, setIsShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mainFn, setMainFn] = useState<(e: any) => void>(() => {});

  const show = (text: string) => {
    if (isMainButtonMounted && !isShow) {
      mainButton.setParams({
        text: text,
        isEnabled: true,
        isVisible: true,
        hasShineEffect: true,
        isLoaderVisible,
        textColor,
        backgroundColor,
      });
      setIsShow(true);
    }
  };

  const hide = () => {
    if (isShow) {
      mainButton.setParams({
        text: "",
        isVisible: false,
        textColor: undefined,
        backgroundColor: undefined,
      });
      setIsShow(false);
    }
  };

  const updateButtonClick = (cb: VoidFunction) => {
    setMainFn(cb);
  };

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
      mainButton.offClick(mainFn);
      mainButton.onClick(mainFn);
    }
    return () => {
      mainButton.offClick(mainFn);
    };
  }, [isMainButtonMounted]);

  // useEffect(() => {
  //   if (isMainButtonMounted) {
  //     if (main) {
  //       mainButton.setParams({
  //         text: text,
  //         isEnabled: true,
  //         isVisible: true,
  //         hasShineEffect: true,
  //         isLoaderVisible,
  //         textColor,
  //         backgroundColor,
  //       });
  //       if (mainButtonOnClick) {
  //         mainButton.onClick(mainButtonOnClick);
  //       }
  //     } else {
  //       mainButton.setParams({
  //         text: text,
  //         isVisible: false,
  //         textColor: undefined,
  //         backgroundColor: undefined,
  //       });
  //     }
  //   }
  // }, [
  //   main,
  //   isMainButtonMounted,
  //   text,
  //   backgroundColor,
  //   textColor,
  //   isLoaderVisible,
  // ]);

  // useEffect(() => {
  //   if (isMainButtonMounted) {
  //     const unsubscribe = mainButton.onClick(() => {
  //       mainButton.setParams({
  //         text: text,
  //         isVisible: false,
  //       });
  //       if (mainButtonOnClick) {
  //         mainButton.offClick(mainButtonOnClick);
  //       }
  //     });
  //
  //     return () => {
  //       if (unsubscribe) unsubscribe();
  //     };
  //   }
  // });

  return { show, hide, updateButtonClick, isShow };
};
