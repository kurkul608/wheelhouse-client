import { Page } from "@/components/Page";
import { getCarCard } from "@/actions/carCard/get";
import { CarCardItem } from "@/components/CarCardItem";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Карточка автомобиля ${slug}`,
  };
}

export default async function Car({ params }: Props) {
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
