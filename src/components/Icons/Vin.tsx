import { Icon } from "@/components/Icons/IconType";

export const Vin = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <path
      fill="currentColor"
      d="M7 22h6v-2H7c-.551 0-1-.449-1-1V5c0-.551.449-1 1-1h10c.551 0 1 .449 1 1v9h2V5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3"
    ></path>
    <path
      fill="currentColor"
      d="M8 11h8v2H8zm0-4h8v2H8zm0 8h5v2H8zm6 4 3.301 3 5.111-5.586L20.998 15l-3.696 4.207-1.838-1.671z"
    ></path>
  </svg>
);
