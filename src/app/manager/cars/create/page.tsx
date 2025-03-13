import { ManagerCarCardCreate } from "@/components/Manager/CarCard/Create";
import { Page } from "@/components/Page";

export const metadata = {
  title: "Менеджер создание авто",
};

export default async function ManagerCarCreatePage() {
  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <ManagerCarCardCreate />
      </div>
    </Page>
  );
}
