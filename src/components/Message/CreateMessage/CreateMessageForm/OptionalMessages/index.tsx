"use client";
import { classNames } from "@telegram-apps/sdk-react";
import { WhereUsersEnum } from "@/constants/whereUserOptions";
import { Input, Subheadline } from "@telegram-apps/telegram-ui";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";
import MultiSelectWithSearch from "@/components/MultiSelectWithSearch";
import { useFormikContext } from "formik";
import { CreateMessageFormValues } from "@/components/Message/CreateMessage/CreateMessageForm";

export const OptionalMessages = () => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<CreateMessageFormValues>();
  return (
    <>
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
    </>
  );
};
