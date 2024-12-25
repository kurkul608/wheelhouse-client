"use client";

import { Breadcrumbs as TGBreadcrumbs } from "@telegram-apps/telegram-ui";
import { BreadCrumbsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem";
import { FC } from "react";
import { useRouter } from "next/navigation";
import "./breadcrumbs.css";
import { CarItemActions } from "@/components/CarItemActions";

interface IBreadcrumbsItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: IBreadcrumbsItem[];
}
export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter();
  return (
    <div className={"mb-2 breadcrumbs-container relative w-full"}>
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
      <CarItemActions />
    </div>
  );
};
