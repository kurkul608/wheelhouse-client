import { Icon } from "@/components/Icons/IconType";

export const Parameters = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...restProps}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.879 1.879A3 3 0 0 1 8.905 3.25H16v1.5H8.905a3 3 0 0 1-5.81 0H0v-1.5h3.095a3 3 0 0 1 .784-1.371m3.182 1.06a1.5 1.5 0 1 0-2.122 2.122 1.5 1.5 0 0 0 2.122-2.122M16 11.25h-3.095a2.999 2.999 0 0 0-5.81 0H0v1.5h7.095a3 3 0 0 0 5.81 0H16zm-6-.75a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"
      clipRule="evenodd"
    ></path>
  </svg>
);
