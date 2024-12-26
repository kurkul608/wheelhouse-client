import type { LaunchParams } from "@telegram-apps/sdk";

export const getAuthorization = (lp: LaunchParams): HeadersInit => {
  return {
    Authorization: lp.initDataRaw || "",
  };
};
