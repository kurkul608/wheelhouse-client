import { Icon } from "@/components/Icons/IconType";

export const Color = ({ ...restProps }: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={"w-[24px] h-[24px]}"}
    {...restProps}
  >
    <path
      fillRule="evenodd"
      d="m12.609 1.38 5.524 10.92A7.36 7.36 0 0 1 19 15.78c0 3.938-3.058 7.14-6.857 7.219-3.813.077-7.06-3.132-7.141-7.063a7.36 7.36 0 0 1 .865-3.636l5.524-10.92a.677.677 0 0 1 1.218 0M12.229 21A4.89 4.89 0 0 1 9 19.853L16.465 14A4.74 4.74 0 0 1 17 16.19c0 2.623-2.126 4.757-4.771 4.81m2.994-6.026c.157.383.24.793.24 1.216 0 1.78-1.45 3.235-3.264 3.27a3.34 3.34 0 0 1-1.948-.586z"
      clip-rule="evenodd"
    ></path>
  </svg>
);
