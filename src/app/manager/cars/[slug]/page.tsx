import { Page } from "@/components/Page";
import { ManagerCarCard } from "@/components/Manager/CarCard";

export default async function ManagerCarsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
