import { Icon } from "@/components/Icons/IconType";

export const Year = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <path
      fill="currentColor"
      d="M18.004 3.033H17V1h-2v2.024H9V1H7v2.015H6a3 3 0 0 0-3 2.999V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6.034a3 3 0 0 0-2.996-3.001M6 5.024h12.002c.55.001.998.459.998 1.01V8H5V6.015a.993.993 0 0 1 1-.991M18 19H6c-.551 0-1-.449-1-1v-8h14v8c0 .551-.449 1-1 1m-8-4H7v-3h3z"
    ></path>
  </svg>
);
