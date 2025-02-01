"use client";

import { Multiselect, Select, Subheadline } from "@telegram-apps/telegram-ui";
import { useContext } from "react";
import {
  CarCardsFiltersContext,
  CarCardsStockFilter,
} from "@/contexts/carCardsFiltersContext";
import {
  CAR_BRANDS_FILTER_OPTIONS,
  CarBrandsFilterType,
} from "@/constants/carBrandsFilterOptions";
import {
  CAR_MODELS_FILTER_OPTIONS,
  CarModelsFilterType,
} from "@/constants/carModelsFilterOptions";
import { STOCK_FILTER_OPTIONS } from "@/constants/stockFilterOptions";
import { CAR_LIST_SORT_OPTIONS } from "@/constants/carListSortOptions";

export const CarCardListFilters = () => {
  const {
    update,
    // search,
    carModelFilter,
    carBrandFilter,
    stockFilter,
    minDateFilter,
    maxDateFilter,
    sortBy,
    sortOrder,
  } = useContext(CarCardsFiltersContext);

  return (
    <div>
      {/*<Input*/}
      {/*  header={"Поиск авто"}*/}
      {/*  value={search}*/}
      {/*  onChange={(event) => {*/}
      {/*    if (update) update({ search: event.target.value ?? "" });*/}
      {/*  }}*/}
      {/*  placeholder={"Введите название авто"}*/}
      {/*/>*/}
      <Select
        header={"Наличие авто"}
        onChange={(event) => {
          if (update)
            update({
              stockFilter: event.target.value as CarCardsStockFilter,
            });
        }}
        value={stockFilter}
      >
        {STOCK_FILTER_OPTIONS.map((option) => (
          <option value={option.value} key={`stock-filter-${option.value}`}>
            {option.label}
          </option>
        ))}
      </Select>
      <Multiselect
        header={"Марка авто"}
        placeholder={"Марка авто"}
        options={CAR_BRANDS_FILTER_OPTIONS}
        value={CAR_BRANDS_FILTER_OPTIONS.filter((option) =>
          carBrandFilter.some((opt) => opt === option.value),
        )}
        onChange={(newOptions) => {
          if (update)
            update({
              carBrandFilter: newOptions.map(
                (opt) => opt.value,
              ) as CarBrandsFilterType[],
            });
        }}
      />
      <Multiselect
        header="Модель авто"
        placeholder="Модель авто"
        options={CAR_MODELS_FILTER_OPTIONS}
        value={CAR_MODELS_FILTER_OPTIONS.filter((option) =>
          carModelFilter.some((opt) => opt === option.value),
        )}
        onChange={(newOptions) => {
          if (update)
            update({
              carModelFilter: newOptions.map(
                (option) => option.value,
              ) as CarModelsFilterType[],
            });
        }}
      />
      <div>
        <Subheadline className={"px-[22px]"}>Год</Subheadline>
        <div className={"flex items-center justify-between"}>
          <Select
            header={"Мин"}
            onChange={(event) => {
              if (update) update({ minDateFilter: +event.target.value });
            }}
            value={minDateFilter}
          >
            {Array.from(
              { length: new Date().getFullYear() - 2004 + 1 },
              (_, i) => 2004 + i,
            ).map((option) => (
              <option key={`min-year-${option}`}>{option}</option>
            ))}
          </Select>{" "}
          -{" "}
          <Select
            header={"Макс"}
            onChange={(event) => {
              if (update) update({ maxDateFilter: +event.target.value });
            }}
            value={maxDateFilter}
          >
            {Array.from(
              { length: new Date().getFullYear() - 2004 + 1 },
              (_, i) => 2004 + i,
            ).map((option) => (
              <option key={`max-year-${option}`}>{option}</option>
            ))}
          </Select>
        </div>
        <div className={"flex justify-end"}>
          <Select
            header={"Сортировка"}
            value={
              CAR_LIST_SORT_OPTIONS.find(
                (option) =>
                  option.sortBy === sortBy && option.sortOrder === sortOrder,
              )?.id
            }
            onChange={(event) => {
              const sort = CAR_LIST_SORT_OPTIONS.find(
                (option) => option.id === +event.target.value,
              );
              if (sort && update)
                update({ sortBy: sort.sortBy, sortOrder: sort.sortOrder });
            }}
          >
            {CAR_LIST_SORT_OPTIONS.map((option) => (
              <option value={option.id} key={`sort-${option.id}`}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
