import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";

export async function CarCardList() {
  const initialUsers = await getCarCardsList(0, { stockFilter: "all" });

  return (
    <CarCardItemList initialList={initialUsers ?? []} isScrollActive={true} />
  );
}
