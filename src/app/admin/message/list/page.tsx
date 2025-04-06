import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Page } from "@/components/Page";
import { MessageList } from "@/components/Message/MessageList";
import { CreateMessage } from "@/components/Message/CreateMessage";

export const metadata = {
  title: "Список активных рассылок",
};

export default async function AdminMessageActivePage() {
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
        <CreateMessage />
        <MessageList />
      </div>
    </Page>
  );
}
