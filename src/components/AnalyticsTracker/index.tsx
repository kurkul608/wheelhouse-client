"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendEventToYandexMetrika } from "@/actions/metrika/sendEventToYandexMetrika";
import { UserContext } from "@/contexts/userContext";

export const AnalyticsTracker = () => {
  const pathname = usePathname();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const sendAnalyticsEvent = async () => {
      if (!user?.clientId) {
        return;
      }

      const pageURL = window.location.href;
      const pageTitle = document.title;
      const prevPage = document.referrer;

      try {
        await sendEventToYandexMetrika({
          eventType: "pageview",
          pageURL,
          pageTitle,
          prevPage,
          clientID: user.clientId,
        });
      } catch (error) {
        console.error("Ошибка при вызове API:", error);
      }
    };

    sendAnalyticsEvent();
  }, [pathname, user?.clientId]);

  return null;
};
