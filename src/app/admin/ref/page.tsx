import { Page } from "@/components/Page";
import { CreateRefLink } from "@/components/RefLink/CreateRef";
import { RefLinkList } from "@/components/RefLink/RefLinkList";

export default async function AdminPage() {
  return (
    <Page>
      <div style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
        <CreateRefLink />
        <RefLinkList />
      </div>
    </Page>
  );
}
