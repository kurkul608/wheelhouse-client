import Image from "next/image";
import { FC } from "react";
import { Link } from "@/components/Link/Link";

interface NavigationIconProps {
  href: string;
  svrSrc: string;
  text: string;
}

export const NavigationIcon: FC<NavigationIconProps> = ({
  text,
  svrSrc,
  href,
}) => {
  return (
    <Link href={href}>
      <div className={"flex flex-col gap-1 items-center"}>
        <Image src={svrSrc} alt={text} width={24} height={24} />
        <span className={"text-xs"}>{text}</span>
      </div>
    </Link>
  );
};
