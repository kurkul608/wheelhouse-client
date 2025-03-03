import { Page } from "@/components/Page";
import { CreateRefLink } from "@/components/RefLink/CreateRef";
import { RefLinkList } from "@/components/RefLink/RefLinkList";

export default async function AdminPage() {
  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <CreateRefLink />
        <RefLinkList />
      </div>
    </Page>
  );
}
