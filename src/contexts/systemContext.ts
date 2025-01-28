import { createContext, RefObject } from "react";

type SystemContext = {
  MainButton: RefObject<null | string>;
  BackButton: RefObject<null | string>;
};

export const createSystemContextValue = () => ({
  MainButton: { current: null },
  BackButton: { current: null },
});

export const SystemContext = createContext<SystemContext>(
  createSystemContextValue(),
);
