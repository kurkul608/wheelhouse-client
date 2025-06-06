import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import Link from "next/link";
import { Page } from "@/components/Page";

export const metadata = {
  title: "Админ страница",
};

export default async function AdminPage() {
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
          header={"Админ меню"}
          footer={
            "Здесь вы можете управлять пользователями - назначать и убирать им роли"
          }
        >
          <Link
            href={"/admin/users"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Список пользователей</Cell>
          </Link>
          <Link
            href={"/admin/ref"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Реферальные ссылки</Cell>
          </Link>
          <Link
            href={"/admin/message"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Рассылка</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
}
