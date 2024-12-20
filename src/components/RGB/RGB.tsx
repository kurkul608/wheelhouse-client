import { classNames, type RGB as RGBType } from "@telegram-apps/sdk-react";
import type { FC, JSX } from "react";

export type RGBProps = JSX.IntrinsicElements["div"] & {
  color: RGBType;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
  <span
    {...rest}
    className={classNames(
      "inline-flex",
      "items-center",
      "gap-[5px]",
      className,
    )}
  >
    <i
      className={classNames(
        "w-[18px]",
        "aspect-square",
        "border",
        "border-[#555]",
        "rounded-full",
      )}
      style={{ backgroundColor: color }}
    />
    {color}
  </span>
);
