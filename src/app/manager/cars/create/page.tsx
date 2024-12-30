import { ManagerCarCardCreate } from "@/components/Manager/CarCard/Create";
import { Page } from "@/components/Page";

export default async function ManagerCarCreatePage() {
  return (
    <Page>
      <div style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
        <ManagerCarCardCreate />
      </div>
    </Page>
  );
}
