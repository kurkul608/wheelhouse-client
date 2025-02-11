// import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";
import { getCarCardsList } from "@/actions/carCard/getList";

export async function CarCardList() {
  const initialCars = await getCarCardsList(0, {
    stockFilter: "all",
    search: "",
  });

  return (
    <CarCardItemList initialList={initialCars ?? []} isScrollActive={true} />
  );
}
