import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { List } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page";
import { CreateMessageTemplate } from "@/components/Message/MessageTemplate/CreateMessageTemplate";
import { ListMessageTemplate } from "@/components/Message/MessageTemplate/ListMessageTemplate";

export const metadata = {
  title: "Админ страница",
};

export default async function AdminMessageTemplatePage() {
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
        <ListMessageTemplate />
      </div>
    </Page>
  );
}
