"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  miniApp,
  useLaunchParams,
  useSignal,
  initData,
  disableVerticalSwipes,
  swipeBehavior,
} from "@telegram-apps/sdk-react";
import { AppRoot, Spinner } from "@telegram-apps/telegram-ui";
import { useClientOnce } from "@/hooks/useClientOnce";
import { init } from "@/core/init";
import { setLocale } from "@/core/i18n/locale";
import { useDidMount } from "@/hooks/useDidMount";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useRegister } from "@/hooks/useRegister";
import { UserContext } from "@/contexts/userContext";
import { BucketContext } from "@/contexts/bucketContext";
import { WishlistContext } from "@/contexts/wishlistContext";
import { Navigation } from "@/components/Navigation";
import { usePathname, useRouter } from "next/navigation";
import { CarCardsFiltersContext } from "@/contexts/carCardsFiltersContext";
import { useCarCardsFilters } from "@/hooks/useCarCardsFilters";
import { useStartParams } from "@/hooks/useStartParams";
import {
  createSystemContextValue,
  SystemContext,
} from "@/contexts/systemContext";
import { DEFAULT_OPTIONS, OptionsContext } from "@/contexts/OptionsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFilters } from "@/hooks/useFilters";
import { FiltersContext } from "@/contexts/filtersContext";

function RootInner({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";
  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";
  const [isInitLoading, setIsInitLoading] = useState(true);

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

  useEffect(() => {
    if (swipeBehavior.isMounted()) {
      disableVerticalSwipes();
    }
  }, [swipeBehavior.isMounted()]);

  const [user, bucket, wishlist, updateRegisterData] = useRegister();
  const { brands, models } = useFilters();

  useEffect(() => {
    if (
      user !== null &&
      bucket !== null &&
      wishlist !== null &&
      brands !== null &&
      models !== null &&
      isInitLoading &&
      pathname === "/"
    ) {
      router.push("/cars");
      setIsInitLoading(false);
    }
  }, [user, bucket, wishlist]);

  const {
    stockFilter,
    update: updateCarCardsFilter,
    search: searchFilter,
    carBrandFilter,
    carModelFilter,
    minDateFilter,
    maxDateFilter,
    sortOrder,
    sortBy,
  } = useCarCardsFilters();

  useStartParams(user !== null && bucket !== null && wishlist !== null);

  const systemValue = useMemo(createSystemContextValue, []);

  const queryClient = new QueryClient();

  if (user?.roles.some((role) => role === "SUPER_ADMIN")) {
    console.log(lp.initDataRaw);
  }

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, update: updateRegisterData }}>
          <BucketContext.Provider
            value={{ bucket, update: updateRegisterData }}
          >
            <WishlistContext.Provider
              value={{ wishlist, update: updateRegisterData }}
            >
              <FiltersContext.Provider
                value={{ brands: brands ?? [], models: models ?? {} }}
              >
                <CarCardsFiltersContext.Provider
                  value={{
                    stockFilter,
                    update: updateCarCardsFilter,
                    search: searchFilter,
                    carBrandFilter: carBrandFilter,
                    carModelFilter,
                    maxDateFilter,
                    minDateFilter,
                    sortBy,
                    sortOrder,
                  }}
                >
                  <SystemContext.Provider value={systemValue}>
                    <OptionsContext.Provider value={DEFAULT_OPTIONS}>
                      {user == null ||
                      bucket === null ||
                      wishlist === null ||
                      brands === null ||
                      models === null ||
                      pathname === "/" ? (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <Spinner size="l" />
                        </div>
                      ) : (
                        <>
                          {children}
                          {pathname !== "/" && <Navigation />}
                        </>
                      )}
                    </OptionsContext.Provider>
                  </SystemContext.Provider>
                </CarCardsFiltersContext.Provider>
              </FiltersContext.Provider>
            </WishlistContext.Provider>
          </BucketContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
      <div id="modal-root"></div>
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
