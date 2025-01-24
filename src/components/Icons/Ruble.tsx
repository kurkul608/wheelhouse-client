import { Icon } from "@/components/Icons/IconType";

export const Ruble = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <path
      fill="currentColor"
      d="M14.5 13c2.481 0 4.5-2.019 4.5-4.5S16.981 4 14.5 4H7v7H4v2h3v2H4v2h3v4h2v-4h6v-2H9v-2zM9 6h5.5C15.879 6 17 7.121 17 8.5S15.879 11 14.5 11H9z"
    ></path>
  </svg>
);
