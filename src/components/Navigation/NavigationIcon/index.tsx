import { FC, ReactNode } from "react";
import { Link } from "@/components/Link/Link";
import "./navigationIcon.css";
import { InlineButtons } from "@telegram-apps/telegram-ui";

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
      <InlineButtons.Item text={text}>{icon}</InlineButtons.Item>
    </Link>
  );
};
