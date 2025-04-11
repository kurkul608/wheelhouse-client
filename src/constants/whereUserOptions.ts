export enum WhereUsersEnum {
  ONCE_USE_BOT = "ONCE_USE_BOT",
  N_AUTO_IN_WISHLIST = "N_AUTO_IN_WISHLIST",
  SPECIAL_AUTO_IN_WISHLIST = "SPECIAL_AUTO_IN_WISHLIST",
  MANY_SPECIAL_AUTO_IN_WISHLIST = "MANY_SPECIAL_AUTO_IN_WISHLIST",
  MANY_ORDERS = "MANY_ORDERS",
  MANY_ORDER_ON_BRAND = "MANY_ORDER_ON_BRAND",
}

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
    label: "Пользователи, которые добавили определенную марку авто в вишлист",
    value: WhereUsersEnum.SPECIAL_AUTO_IN_WISHLIST,
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
];
