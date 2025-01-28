import { createContext } from "react";

export type Options = {
  /**
   * When is `true`, we can smooth button transitions due to show(), hide() calls.
   * So when you use MainButton or BackButton on multiple pages, there will be
   * no noticeable flickering of the button during transitions
   * @defaultValue `false`
   */
  smoothButtonsTransition?: boolean;
  async?: boolean;
  smoothButtonsTransitionMs?: number;
};

export const DEFAULT_OPTIONS: Options = {
  smoothButtonsTransition: false,
  smoothButtonsTransitionMs: 10,
};

export const OptionsContext = createContext<Options>(DEFAULT_OPTIONS);
