import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardItemList } from "@/components/CarCardItem/CarCardItem";

// interface CarCardListProps {
//   filters?: {
//     [x: string]: string;
//   };
// }

export async function CarCardList() {
  const data = await getCarCardsList();
  return data.length ? <CarCardItemList list={data} /> : null;
}
