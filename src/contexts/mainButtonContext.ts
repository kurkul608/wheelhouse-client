import { createContext } from "react";

export const MainButtonContext = createContext<{
  isShow: boolean;
  updateButtonClick: ((cb: () => void) => void) | null;
  show: ((text: string) => void) | null;
  hide: (() => void) | null;
}>({
  isShow: false,
  updateButtonClick: null,
  show: null,
  hide: null,
});
