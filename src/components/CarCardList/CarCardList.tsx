import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItemList";
import { getCarCardsList } from "@/actions/carCard/getList";
import { CarList } from "@/components/InfiniteCarCardsScroll";

export async function CarCardList() {
  // const initialCars = await getCarCardsList(0, {
  //   stockFilter: "all",
  //   search: "",
  // });

  return (
    // <CarCardItemList initialList={initialCars ?? []} isScrollActive={true} />
    <CarList />
  );
}
