"use client";

import { Breadcrumbs as TGBreadcrumbs } from "@telegram-apps/telegram-ui";
import { BreadCrumbsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem";
import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import "./breadcrumbs.css";

interface IBreadcrumbsItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: IBreadcrumbsItem[];
}
export const Breadcrumbs: FC<PropsWithChildren<BreadcrumbsProps>> = ({
  items,
  children,
}) => {
  const router = useRouter();
  return (
    <div
      className={"breadcrumbs-container relative w-full"}
      style={{ backgroundColor: "var(--tgui--bg_color)" }}
    >
      <TGBreadcrumbs>
        {items.map((item) => (
          <BreadCrumbsItem
            key={`breadcrumb-item-${item.name}`}
            className={"breadcrumb-item"}
            onClick={() => {
              if (item.href) {
                const targetURL = new URL(
                  item.href,
                  window.location.toString(),
                );
                router.push(targetURL.toString());
              }
            }}
          >
            {item.name}
          </BreadCrumbsItem>
        ))}
      </TGBreadcrumbs>
      {children}
    </div>
  );
};
