import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Page } from "@/components/Page";
import { ListMessageTemplate } from "@/components/MessageTemplate/ListMessageTemplate";
import Link from "next/link";
import { Button } from "@telegram-apps/telegram-ui";

export const metadata = {
  title: "Список шаблонов для рассылки",
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
        <Link href={"/admin/message/messageTemplate/create"}>
          <Button>Создать новый шаблон</Button>
        </Link>
        <ListMessageTemplate />
      </div>
    </Page>
  );
}
