import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  mainButton,
  expandViewport,
  $version,
  swipeBehavior,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  $debug.set(debug);

  initSDK();

  if (!mainButton.isMounted()) {
    mainButton.mount();
  }
  if (backButton.isSupported()) {
    backButton.mount();
  }
  if (!miniApp.isMounted()) {
    miniApp.mount();
    miniApp.bindCssVars();
  }

  if (!themeParams.isMounted()) {
    themeParams.mount();
    themeParams.bindCssVars();
  }

  if (expandViewport) {
    expandViewport();
  }

  if (swipeBehavior.isSupported() && !swipeBehavior?.isMounted()) {
    if (swipeBehavior.mount) {
      swipeBehavior.mount();
    }
  }

  initData.restore();

  if (!viewport.isMounted() && !viewport.isMounting()) {
    void viewport.mount().catch((e) => {
      console.error("Something went wrong mounting the viewport", e);
    });
  }

  if (viewport.isMounted()) {
    viewport.bindCssVars();
  }

  // if (debug) {
  //   import("eruda").then((lib) => lib.default.init()).catch(console.error);
  // }
}
