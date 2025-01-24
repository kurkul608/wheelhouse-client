import { Icon } from "@/components/Icons/IconType";

export const Body = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <path
      fill="currentColor"
      d="M21.485 10.621 19 10l-4-4H6L2.894 8.329A4.74 4.74 0 0 0 1 12.118V15l2.089.696A2.996 2.996 0 0 0 6 18a2.99 2.99 0 0 0 2.816-2h7.367a2.99 2.99 0 0 0 2.816 2 2.99 2.99 0 0 0 2.816-2H23v-3.438c0-.918-.625-1.718-1.515-1.941M6 16.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5M9 10H5l2-2h2zm2 0V8h3l2 2zm8 6.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5"
    ></path>
  </svg>
);
