import { WhereUsersEnum } from "@/models/message";

export const whereOptions: { label: string; value: WhereUsersEnum }[] = [
  {
    label: "Пользователи, которые хоть раз зашли в приложение",
    value: WhereUsersEnum.ONCE_USE_BOT,
  },
  {
    label: "Пользователи, которые добавили n авто в вишлист",
    value: WhereUsersEnum.N_AUTO_IN_WISHLIST,
  },
  {
    label: "Пользователи, которые добавили n определенных марок авто в вишлист",
    value: WhereUsersEnum.MANY_SPECIAL_AUTO_IN_WISHLIST,
  },
  {
    label: "Пользователи которые оставили n или более заявок",
    value: WhereUsersEnum.MANY_ORDERS,
  },
  {
    label: "Пользователи которые оставили заявку на определенные марки",
    value: WhereUsersEnum.MANY_ORDER_ON_BRAND,
  },
  {
    label: "Только для администраторов",
    value: WhereUsersEnum.ADMIN_ONLY,
  },
];
