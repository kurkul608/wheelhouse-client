import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Page } from "@/components/Page";
import { CreateMessageTemplate } from "@/components/MessageTemplate/CreateMessageTemplate";

export const metadata = {
  title: "Список шаблонов для рассылки",
};

export default async function AdminMessageTemplateCreatePage() {
  const cookiesStorage = await cookies();

  if (!cookiesStorage.get("roleManager")?.value) {
    redirect("/");
  }

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <CreateMessageTemplate />
      </div>
    </Page>
  );
}
