import { Icon } from "@/components/Icons/IconType";

export const Generation = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="red"
    viewBox="0 0 16 16"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <g fill="currentColor" clipPath={"url(#time_wait_svg__a)"}>
      <path d="M7 1.579V.063A8 8 0 0 0 3.094 1.68l1.074 1.074A6.5 6.5 0 0 1 7 1.579M.063 7A8 8 0 0 1 1.68 3.094l1.074 1.074A6.5 6.5 0 0 0 1.579 7zm1.617 5.905A8 8 0 0 1 .063 9h1.516a6.5 6.5 0 0 0 1.175 2.831zM7 15.937a8 8 0 0 1-3.906-1.617l1.074-1.074A6.5 6.5 0 0 0 7 14.42zm6.657-2.28A8 8 0 0 1 9 15.937v-1.516A6.51 6.51 0 0 0 14.5 8 6.51 6.51 0 0 0 9 1.579V.063a8 8 0 0 1 4.657 13.594"></path>
      <path d="M8.75 4h-1.5v4.925l2.864 1.718.772-1.286L8.75 8.075z"></path>
    </g>
    <defs>
      <clipPath id="time_wait_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
);
