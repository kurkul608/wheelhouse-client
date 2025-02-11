// import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";

export async function CarCardList() {
  // const initialCars = await getCarCardsList(0, {
  //   stockFilter: "all",
  //   search: "",
  // });

  return <CarCardItemList initialList={[]} isScrollActive={true} />;
}
