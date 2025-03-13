import { Page } from "@/components/Page";
import { Bucket as BucketComponent } from "@/components/Bucket";
import { getCarsPageUrl } from "@/utils/getCarsPageUrl";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Корзина",
};

export default async function Bucket() {
  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"min-h-[calc(100vh-62px)]"}
      >
        <Breadcrumbs
          items={[
            {
              name: "Главная",
              href: getCarsPageUrl(),
            },
            { name: "Корзина" },
          ]}
        />
        <BucketComponent />
      </div>
    </Page>
  );
}
