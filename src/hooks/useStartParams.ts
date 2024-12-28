"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { IStartParams } from "@/utils/getMiniAppLink";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useStartParams = (isInitDataLoaded: boolean) => {
  const [redirected, setRedirected] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  useEffect(() => {
    if (!redirected && isInitDataLoaded && lp.startParam) {
      const decodedDataString = atob(lp.startParam);
      const decodedData = JSON.parse(decodedDataString) as IStartParams;

      if (decodedData.carId) {
        setRedirected(true);
        router.push(`/cars/${decodedData.carId}`);
      }
    }
  }, [lp.startParam, isInitDataLoaded, redirected]);
};
