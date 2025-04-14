import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateInClientTimeZone = (
  date: string,
  format = "YYYY-MM-DD HH:mm:ss Z",
) => {
  if (typeof window !== "undefined") {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("clientTimeZone: ", clientTimeZone);
    return dayjs.utc(date).tz(clientTimeZone).format(format);
  }
  return dayjs.utc(date).format(format); // Фолбэк, если нет доступа к `window`
};

export const clientDateToUTC = (date: string) => {
  if (typeof window !== "undefined") {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const zoned = dayjs.tz(date, clientTimeZone);

    return zoned.utc().toISOString(); // Например, 2025-04-13T21:27:00.000Z
  }

  return dayjs(date).utc().toISOString();
};
