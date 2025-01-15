import { Page } from "@/components/Page";
import { getCarCard } from "@/actions/carCard/get";
import { CarCardItem } from "@/components/CarCardItem";

export default async function Car({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carCard = await getCarCard(slug);

  return (
    <Page>
      {carCard ? (
        <CarCardItem carCard={carCard} />
      ) : (
        <div>Ничего не найдено</div>
      )}
    </Page>
  );
}
