import { Page } from "@/components/Page";
import { ManagerCarCard } from "@/components/Manager/CarCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Менеджер карточка авто ${slug}`,
  };
}

export default async function ManagerCarsPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <ManagerCarCard id={slug} />
      </div>
    </Page>
  );
}
