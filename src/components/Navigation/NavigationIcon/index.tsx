import { FC, ReactNode } from "react";
import { Link } from "@/components/Link/Link";
import "./navigationIcon.css";

interface NavigationIconProps {
  href: string;
  icon: ReactNode;
  text: string;
}

export const NavigationIcon: FC<NavigationIconProps> = ({
  text,
  icon,
  href,
}) => {
  return (
    <Link href={href} className={"navigation-link"}>
      <div className={"flex flex-col gap-1 items-center"}>
        {icon}
        <span className={"text-xs"}>{text}</span>
      </div>
    </Link>
  );
};
