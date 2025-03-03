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
    return dayjs.utc(date).tz(clientTimeZone).format(format);
  }
  return dayjs.utc(date).format(format); // Фолбэк, если нет доступа к `window`
};
