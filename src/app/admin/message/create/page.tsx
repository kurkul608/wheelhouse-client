import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { List } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page";
import { CreateMessage } from "@/components/Message/CreateMessage";

export const metadata = {
  title: "Админ создания рассылки",
};

export default async function AdminCreateMessagePage() {
  const cookiesStorage = await cookies();

  if (!cookiesStorage.get("roleManager")?.value) {
    redirect("/");
  }

  return (
    <Page>
      <List
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <CreateMessage />
      </List>
    </Page>
  );
}
