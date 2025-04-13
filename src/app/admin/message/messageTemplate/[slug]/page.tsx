import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Page } from "@/components/Page";
import { MessageTemplateComp } from "@/components/MessageTemplate/MessageTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Шаблон сообщения - ${slug}`,
  };
}

export default async function AdminMessageTemplateIdPage({ params }: Props) {
  const cookiesStorage = await cookies();

  if (!cookiesStorage.get("roleManager")?.value) {
    redirect("/");
  }

  const { slug } = await params;

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <MessageTemplateComp messageTemplateId={slug} />
      </div>
    </Page>
  );
}
