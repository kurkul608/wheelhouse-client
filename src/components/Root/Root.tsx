"use client";

import { PropsWithChildren, useEffect } from "react";
import {
  miniApp,
  useLaunchParams,
  useSignal,
  initData,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useClientOnce } from "@/hooks/useClientOnce";
import { init } from "@/core/init";
import { setLocale } from "@/core/i18n/locale";
import { useDidMount } from "@/hooks/useDidMount";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useRegister } from "@/hooks/useRegister";
import { UserContext } from "@/contexts/userContext";

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";
  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  useClientOnce(() => {
    init(debug);
  });

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  useEffect(() => {
    if (initDataUser) {
      setLocale(initDataUser.languageCode);
    }
  }, [initDataUser]);

  const user = useRegister();

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      Loading
    </div>
  );
}
