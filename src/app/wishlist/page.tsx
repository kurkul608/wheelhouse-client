import { Page } from "@/components/Page";
import { getCarsPageUrl } from "@/utils/getCarsPageUrl";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Wishlist } from "@/components/Wishlist";

export default async function WishlistPage() {
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
            { name: "Избранное" },
          ]}
        />
        <Wishlist />
      </div>
    </Page>
  );
}
