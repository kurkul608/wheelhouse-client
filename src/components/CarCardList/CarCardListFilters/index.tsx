"use client";

import { Button, Subheadline } from "@telegram-apps/telegram-ui";
import { FormEvent, useContext, useState } from "react";
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
import { Modal } from "@/components/Modal";
import { Parameters } from "@/components/Icons/Parameters";
import MultiSelectWithSearch, {
  SelectOption,
} from "@/components/MultiSelectWithSearch";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { YearFilter } from "@/components/YearFilter";

export const CarCardListFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    update,
    carModelFilter,
    carBrandFilter,
    stockFilter,
    minDateFilter,
    maxDateFilter,
    sortBy,
    sortOrder,
  } = useContext(CarCardsFiltersContext);
  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div id={"cars-filters"}>
      <div className={"flex justify-end items-center mb-2"}>
        <Button
          mode={"outline"}
          onClick={() => setIsModalOpen(true)}
          before={<Parameters className={"w-[16px]"} />}
        >
          Показать фильтры
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <form onSubmit={formHandler}>
          <div className={"mb-2"}>
            <SingleSelectWithSearch
              options={STOCK_FILTER_OPTIONS}
              onChange={(option) => {
                if (update)
                  update({
                    stockFilter: option?.value as CarCardsStockFilter,
                  });
              }}
              defaultSelectedOption={STOCK_FILTER_OPTIONS.find(
                (opt) => opt.value === stockFilter,
              )}
              placeholder={"Наличие авто"}
              head={
                <Subheadline className={"px-[22px]"}>Наличие авто</Subheadline>
              }
            />
          </div>
          <div className={"mb-2"}>
            <MultiSelectWithSearch
              head={
                <Subheadline className={"px-[22px]"}>Марка авто</Subheadline>
              }
              options={CAR_BRANDS_FILTER_OPTIONS}
              onChange={(newOptions) => {
                if (update)
                  update({
                    carBrandFilter: newOptions.map(
                      (opt) => opt.value,
                    ) as CarBrandsFilterType[],
                  });
              }}
              placeholder={"Марка авто"}
              defaultSelectedOptions={CAR_BRANDS_FILTER_OPTIONS.filter(
                (option) => carBrandFilter.some((opt) => opt === option.value),
              )}
              targetPortalId={"cars-filters"}
            />
          </div>
          <div className={"mb-2"}>
            <MultiSelectWithSearch
              head={
                <Subheadline className={"px-[22px]"}>Модель авто</Subheadline>
              }
              options={CAR_MODELS_FILTER_OPTIONS}
              onChange={(newOptions) => {
                if (update)
                  update({
                    carModelFilter: newOptions.map(
                      (option) => option.value,
                    ) as CarModelsFilterType[],
                  });
              }}
              placeholder={"Модель авто"}
              defaultSelectedOptions={CAR_MODELS_FILTER_OPTIONS.filter(
                (option) => carModelFilter.some((opt) => opt === option.value),
              )}
              targetPortalId={"cars-filters"}
            />
          </div>
          <div className={"mb-2"}>
            <YearFilter
              onMinChange={(selectedOption: SelectOption<unknown> | null) => {
                if (update && selectedOption)
                  update({
                    minDateFilter: +selectedOption.value,
                  });
              }}
              onMaxChange={(selectedOption: SelectOption<unknown> | null) => {
                if (update && selectedOption)
                  update({
                    maxDateFilter: +selectedOption.value,
                  });
              }}
              defaultMinOption={{
                value: String(minDateFilter),
                label: String(minDateFilter),
              }}
              defaultMaxOption={{
                value: String(maxDateFilter),
                label: String(maxDateFilter),
              }}
              targetPortalId={"cars-filters"}
            />

            <div className={"mb-2"}>
              <SingleSelectWithSearch
                options={CAR_LIST_SORT_OPTIONS}
                onChange={(option) => {
                  if (option && update)
                    update({
                      sortBy: option.value,
                      sortOrder: option.sortOrder,
                    });
                }}
                defaultSelectedOption={CAR_LIST_SORT_OPTIONS.find(
                  (option) =>
                    option.value === sortBy && option.sortOrder === sortOrder,
                )}
                placeholder={"Наличие авто"}
                head={
                  <Subheadline className={"px-[22px]"}>
                    Сортировать по
                  </Subheadline>
                }
                targetPortalId={"cars-filters"}
              />
            </div>
          </div>
          <div className={"mt-2 flex justify-center"}>
            <Button type={"submit"}>Применить фильтры</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
