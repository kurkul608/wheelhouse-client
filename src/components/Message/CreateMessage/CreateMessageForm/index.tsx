import MultiSelectWithSearch, {
  SelectOption,
} from "@/components/MultiSelectWithSearch";
import {
  Button,
  Headline,
  Input,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { useFormik } from "formik";
import { FC } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { classNames } from "@telegram-apps/sdk-react";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";
import { MultiValue } from "react-select";

interface IProps {
  templates: MessageTemplate[];
}
export enum WhereUsersEnum {
  ONCE_USE_BOT = "ONCE_USE_BOT",
  ONE_AUTO_IN_WISHLIST = "ONE_AUTO_IN_WISHLIST",
  N_AUTO_IN_WISHLIST = "N_AUTO_IN_WISHLIST",
  SPECIAL_AUTO_IN_WISHLIST = "SPECIAL_AUTO_IN_WISHLIST",
  MANY_SPECIAL_AUTO_IN_WISHLIST = "MANY_SPECIAL_AUTO_IN_WISHLIST",
  ONE_ORDER = "ONE_ORDER",
  MANY_ORDERS = "MANY_ORDERS",
  ORDER_ON_BRAND = "ORDER_ON_BRAND",
  MANY_ORDER_ON_BRAND = "MANY_ORDER_ON_BRAND",
}

const whereOptions: { label: string; value: WhereUsersEnum }[] = [
  {
    label: "Пользователи, которые хоть раз зашли в приложение",
    value: WhereUsersEnum.ONCE_USE_BOT,
  },
  {
    label: "Пользователи, которые добавили хотя бы один автомобиль в вишлист",
    value: WhereUsersEnum.ONE_AUTO_IN_WISHLIST,
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
    label: "Пользователи которые оставили одну или более заявок",
    value: WhereUsersEnum.ONE_ORDER,
  },
  {
    label: "Пользователи которые оставили n или более заявок",
    value: WhereUsersEnum.MANY_ORDERS,
  },
  {
    label: "Пользователи которые оставили заявку на определенную марку",
    value: WhereUsersEnum.ORDER_ON_BRAND,
  },
  {
    label: "Пользователи которые оставили заявку на определенные марки",
    value: WhereUsersEnum.MANY_ORDER_ON_BRAND,
  },
];

export const CreateMessageForm: FC<IProps> = ({ templates }) => {
  const { handleSubmit, setFieldValue, values, handleChange } = useFormik<{
    template: null | SelectOption<unknown>;
    name: string;
    whereUser: null | SelectOption<unknown>;
    countAutoInWishlist: null | number;
    countOrders: null | number;
    specialCarBrand: null | SelectOption<unknown>;
    manySpecialCarBrand: MultiValue<SelectOption<unknown>>;
    orderOnBrand: null | SelectOption<unknown>;
    manyOrderOnBrand: MultiValue<SelectOption<unknown>>;
  }>({
    initialValues: {
      template: null,
      name: "",
      whereUser: null,
      countAutoInWishlist: null,
      specialCarBrand: null,
      countOrders: null,
      manySpecialCarBrand: [],
      orderOnBrand: null,
      manyOrderOnBrand: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={"w-[85vw] h-[85vh]"}
      id={"create-message"}
    >
      <Headline>Создание рассылки</Headline>
      <div className={"mt-2"}>
        <Subheadline className={"px-[22px]"}>Название рассылки</Subheadline>
        <Input
          className={"w-full"}
          id={"name"}
          name={"name"}
          placeholder={"Название для рассылки"}
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className={"mt-2"}>
        <SingleSelectWithSearch
          isSearchable={false}
          options={templates.map((mt) => ({ value: mt.id, label: mt.name }))}
          onChange={(newOptions) => {
            setFieldValue("template", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>Шаблон сообщения</Subheadline>
          }
          placeholder={"Выбрать шаблон сообщения"}
          defaultSelectedOption={values.template}
          targetPortalId={"create-message"}
        />
      </div>
      <div className={"mt-2"}>
        <SingleSelectWithSearch
          isSearchable={false}
          options={whereOptions as SelectOption<unknown>[]}
          onChange={(newOptions) => {
            setFieldValue("whereUser", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>
              Фильтр пользователей
            </Subheadline>
          }
          placeholder={"Выбрать фильтр по пользователям"}
          defaultSelectedOption={values.whereUser}
          targetPortalId={"create-message"}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.whereUser?.value !== WhereUsersEnum.N_AUTO_IN_WISHLIST,
        })}
      >
        <Subheadline className={"px-[22px]"}>
          Количество авто в вишлисте
        </Subheadline>
        <Input
          disabled={
            values.whereUser?.value !== WhereUsersEnum.N_AUTO_IN_WISHLIST
          }
          className={"w-full"}
          id={"countAutoInWishlist"}
          name={"countAutoInWishlist"}
          placeholder={"Количество авто в вишлисте"}
          value={
            values.countAutoInWishlist !== null
              ? String(values.countAutoInWishlist)
              : undefined
          }
          onChange={handleChange}
        />
      </div>

      <div
        className={classNames("mt-2", {
          hidden:
            values.whereUser?.value !== WhereUsersEnum.SPECIAL_AUTO_IN_WISHLIST,
        })}
      >
        <SingleSelectWithSearch
          disabled={
            values.whereUser?.value !== WhereUsersEnum.SPECIAL_AUTO_IN_WISHLIST
          }
          isSearchable={false}
          options={CAR_BRANDS_FILTER_OPTIONS}
          onChange={(newOptions) => {
            setFieldValue("specialCarBrand", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>
              Марка авто, добавленный в вишлист
            </Subheadline>
          }
          placeholder={"Марка авто, добавленный в вишлист"}
          defaultSelectedOption={values.specialCarBrand}
          targetPortalId={"create-message"}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden:
            values.whereUser?.value !==
            WhereUsersEnum.MANY_SPECIAL_AUTO_IN_WISHLIST,
        })}
      >
        <MultiSelectWithSearch
          disabled={
            values.whereUser?.value !==
            WhereUsersEnum.MANY_SPECIAL_AUTO_IN_WISHLIST
          }
          isSearchable={false}
          options={CAR_BRANDS_FILTER_OPTIONS}
          onChange={(newOptions) => {
            setFieldValue("manySpecialCarBrand", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>
              Марки авто, добавленный в вишлист
            </Subheadline>
          }
          placeholder={"Марки авто, добавленный в вишлист"}
          defaultSelectedOptions={values.manySpecialCarBrand}
          targetPortalId={"create-message"}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.whereUser?.value !== WhereUsersEnum.MANY_ORDERS,
        })}
      >
        <Subheadline className={"px-[22px]"}>Количество заявок</Subheadline>
        <Input
          disabled={values.whereUser?.value !== WhereUsersEnum.MANY_ORDERS}
          className={"w-full"}
          id={"countOrders"}
          name={"countOrders"}
          placeholder={"Количество заявок"}
          value={
            values.countAutoInWishlist !== null
              ? String(values.countOrders)
              : undefined
          }
          onChange={handleChange}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.whereUser?.value !== WhereUsersEnum.ORDER_ON_BRAND,
        })}
      >
        <SingleSelectWithSearch
          disabled={values.whereUser?.value !== WhereUsersEnum.ORDER_ON_BRAND}
          isSearchable={false}
          options={CAR_BRANDS_FILTER_OPTIONS}
          onChange={(newOptions) => {
            setFieldValue("orderOnBrand", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>
              Марка авто на которую была сделана заявка
            </Subheadline>
          }
          placeholder={"Марка авто, добавленный в вишлист"}
          defaultSelectedOption={values.orderOnBrand}
          targetPortalId={"create-message"}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden:
            values.whereUser?.value !== WhereUsersEnum.MANY_ORDER_ON_BRAND,
        })}
      >
        <MultiSelectWithSearch
          disabled={
            values.whereUser?.value !== WhereUsersEnum.MANY_ORDER_ON_BRAND
          }
          isSearchable={false}
          options={CAR_BRANDS_FILTER_OPTIONS}
          onChange={(newOptions) => {
            setFieldValue("manyOrderOnBrand", newOptions);
          }}
          head={
            <Subheadline className={"px-[22px]"}>
              Марки авто на которую была сделана заявка
            </Subheadline>
          }
          placeholder={"Марки авто на которую была сделана заявка"}
          defaultSelectedOptions={values.manyOrderOnBrand}
          targetPortalId={"create-message"}
        />
      </div>
      <div className={"mt-2 w-full flex justify-center"}>
        <Button type={"submit"}>Сохарнить рассылку</Button>
      </div>
    </form>
  );
};
