"use client";
import { classNames } from "@telegram-apps/sdk-react";
import { Input, Subheadline } from "@telegram-apps/telegram-ui";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";
import MultiSelectWithSearch from "@/components/MultiSelectWithSearch";
import { useFormikContext } from "formik";
import { WhereUsersEnum } from "@/models/message";
import { MessageFormValues } from "@/components/Message/MessageForm";

export const OptionalMessages = () => {
  const { values, handleChange, setFieldValue, touched, errors } =
    useFormikContext<MessageFormValues>();
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
        {touched.countAutoInWishlist && errors.countAutoInWishlist && (
          <div style={{ color: "red" }}>{errors.countAutoInWishlist}</div>
        )}
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
        {/*{touched.manySpecialCarBrand && errors.manySpecialCarBrand && (*/}
        {/*  <div style={{ color: "red" }}>{errors.manySpecialCarBrand}</div>*/}
        {/*)}*/}
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
        {touched.countOrders && errors.countOrders && (
          <div style={{ color: "red" }}>{errors.countOrders}</div>
        )}
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
        {/*{touched.manyOrderOnBrand && errors.manyOrderOnBrand && (*/}
        {/*  <div style={{ color: "red" }}>{errors.manyOrderOnBrand}</div>*/}
        {/*)}*/}
      </div>
    </>
  );
};
