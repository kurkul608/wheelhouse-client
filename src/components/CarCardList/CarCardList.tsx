import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";

interface CarCardListProps {
  filters?: {
    [x: string]: string;
  };
  page: number;
}

export async function CarCardList({ page }: CarCardListProps) {
  const data = await getCarCardsList(page);
  return data.length ? <CarCardItemList list={data} /> : null;
}
