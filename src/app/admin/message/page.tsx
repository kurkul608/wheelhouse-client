import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import Link from "next/link";
import { Page } from "@/components/Page";

export const metadata = {
  title: "Админ меню рассылки",
};

export default async function AdminMessagePage() {
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
        <Section
          header={"Меню рассылки"}
          footer={"Здесь происходит управление рассылкой"}
        >
          <Link
            href={"/admin/message/messageTemplate"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Шаблоны сообщений</Cell>
          </Link>
          <Link
            href={"/admin/message/list"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Рассылки</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
}
