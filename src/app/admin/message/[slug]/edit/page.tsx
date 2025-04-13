"use server";

import { Page } from "@/components/Page";
import { List } from "@telegram-apps/telegram-ui";
import { EditMessage } from "@/components/Message/EditMessage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Страница просмора сообщеня для рассылки ${slug}`,
  };
}

export default async function MessageByIdPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Page>
      <List
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <EditMessage slug={slug} />
      </List>
    </Page>
  );
}
