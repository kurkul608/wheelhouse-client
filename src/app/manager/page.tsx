import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const cookiesStorage = await cookies();

  if (!cookiesStorage.get("roleManager")?.value) {
    redirect("/");
  }
  return (
    <div
      style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
      className={"h-[calc(100vh-62px)] overflow-auto"}
    >
      <List>
        <Section
          header="Список авто для менеджеров"
          footer="На этой странице вы можете создавать новые авто, реадактировать старые, управлять наличием"
        >
          <Link
            href={"/manager/cars"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Список авто</Cell>
          </Link>
        </Section>
        <Section
          header="Добавить новый автомобиль"
          footer="На этой страницу вы можете создать новое авто"
        >
          <Link
            href={"/manager/cars/create"}
            style={{
              textDecoration: "none",
              color: "var(--tgui--link_color)",
            }}
          >
            <Cell subtitle="Нажать для перехода">Добавить новое авто</Cell>
          </Link>
        </Section>
      </List>
    </div>
  );
}
