import { classNames, type RGB as RGBType } from "@telegram-apps/sdk-react";
import type { FC } from "react";

export type RGBProps = JSX.IntrinsicElements["div"] & {
  color: RGBType;
  size?: number;
};

export const RGB: FC<RGBProps> = ({ color, className, size, ...rest }) => {
  console.log(size);
  return (
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
          "aspect-square",
          "border",
          "border-[#555]",
          "rounded-full",
        )}
        style={{ backgroundColor: color, width: size ? `${size}px` : "18px" }}
      />
      {/*{color}*/}
    </span>
  );
};
