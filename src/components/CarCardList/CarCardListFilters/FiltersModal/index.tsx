"use client";

import { useContext } from "react";
import {
  CarCardsFiltersContext,
  CarCardsStockFilter,
} from "@/contexts/carCardsFiltersContext";
import {
  Select,
  Subheadline,
  Modal,
  Placeholder,
  Button,
  Multiselect,
} from "@telegram-apps/telegram-ui";
import { Parameters } from "@/components/Icons/Parameters";
import { STOCK_FILTER_OPTIONS } from "@/constants/stockFilterOptions";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";
import {
  CAR_MODELS_FILTER_OPTIONS,
  CarModelsFilterType,
} from "@/constants/carModelsFilterOptions";

export const FiltersModal = () => {
  const { stockFilter, update, carModelFilter } = useContext(
    CarCardsFiltersContext,
  );

  return (
    <Modal
      header={<Modal.Header />}
      trigger={
        <div className={"flex justify-end px-[18px]"}>
          <Button
            before={<Parameters className={"w-[16px]"} />}
            mode="gray"
            size="s"
          >
            Параметры
          </Button>
        </div>
      }
    >
      <Placeholder
        header="Параметры"
        description="Установите необходимые параметры и они применяться автоматически"
      />
      <div>
        <Subheadline>Наличие авто</Subheadline>
        <Select
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
      </div>
      <div>
        <Subheadline>Марка авто</Subheadline>
        <Multiselect
          header={"Марка авто"}
          options={CAR_BRANDS_FILTER_OPTIONS}
          value={[]}
        />
      </div>
      <div>
        <Subheadline>Модель авто</Subheadline>
        <Multiselect
          header="Модель авто"
          placeholder="Выберите одну или несколько моделей"
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
      </div>
    </Modal>
  );
};
