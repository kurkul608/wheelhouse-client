"use server";

import axios from "axios";

interface MetrikaParams {
  clientID: string;
  eventType: "pageview" | "event";
}

interface MetrikaParamsPageView extends MetrikaParams {
  pageURL: string;
  pageTitle: string;
  prevPage: string;
}

export async function sendEventToYandexMetrika({
  eventType,
  clientID,
  pageURL,
  pageTitle,
  prevPage,
}: MetrikaParamsPageView): Promise<void> {
  if (!clientID) {
    console.warn("clientID не найден. Событие не отправлено.");
    return;
  }

  if (!process.env.METRIKA_ID) {
    console.warn("METRIKA_ID не найден. Событие не отправлено.");
    return;
  }

  if (!process.env.MS_TOKEN) {
    console.warn("MS_TOKEN не найден. Событие не отправлено.");
    return;
  }

  const searchParams = new URLSearchParams({
    tid: process.env.METRIKA_ID,
    cid: clientID,
    t: eventType,
    ...(eventType === "pageview"
      ? { dr: prevPage || "-", dl: pageURL || "", dt: pageTitle || "" }
      : {}),
    ms: process.env.MS_TOKEN,
  });

  try {
    const response = await axios.post(
      "https://mc.yandex.ru/collect",
      {},
      { params: searchParams },
    );
    if (response.status !== 200) {
      throw new Error(`Ошибка отправки события: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
