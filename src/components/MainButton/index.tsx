import { useContext, useEffect, useId } from "react";
import { SystemContext } from "@/contexts/systemContext";
import { mainButton, useLaunchParams } from "@telegram-apps/sdk-react";
import useSmoothButtonsTransition from "@/hooks/useSmoothButtonsTransition";

export interface MainButtonProps {
  text?: string;
  progress?: boolean;
  disable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
  textColor?: string;
}

export const MainButton = ({
  text = "CONTINUE",
  progress = false,
  disable: disable_old,
  disabled: disable_new = false,
  color,
  textColor,
  onClick,
}: MainButtonProps): null => {
  const system = useContext(SystemContext);
  const buttonId = useId();
  // const WebApp = useWebApp();
  // const MainButton = WebApp.MainButton;
  const MainButton = mainButton;
  const lp = useLaunchParams();
  const themeParams = lp.themeParams;
  const disabled = disable_old || disable_new;

  useEffect(() => {
    MainButton?.setParams({
      backgroundColor: (color ||
        themeParams?.button_color ||
        "#fff") as `#${string}`,
    });
  }, [color, themeParams, MainButton]);

  useEffect(() => {
    MainButton?.setParams({
      textColor: (textColor ||
        themeParams?.button_text_color ||
        "#000") as `#${string}`,
    });
  }, [MainButton, themeParams, textColor]);

  useEffect(() => {
    MainButton?.setParams({ text });
  }, [text, MainButton]);

  useEffect(() => {
    if (disabled) {
      MainButton?.setParams({ isVisible: false });
    } else if (!disabled) {
      MainButton?.setParams({ isVisible: true });
    }
  }, [disabled, MainButton]);

  useEffect(() => {
    if (progress) {
      MainButton?.setParams({ isLoaderVisible: true });
    } else if (!progress) {
      MainButton?.setParams({ isLoaderVisible: false });
    }
  }, [progress, MainButton]);

  useEffect(() => {
    if (!onClick) {
      return;
    }

    MainButton?.onClick(onClick);
    return () => {
      MainButton?.offClick(onClick);
    };
  }, [onClick, MainButton]);

  useSmoothButtonsTransition({
    show: () => MainButton?.setParams({ isVisible: true }),
    hide: () => MainButton?.setParams({ isVisible: false }),
    currentShowedIdRef: system.MainButton,
    id: buttonId,
  });

  return null;
};
