import { useEffect, useState } from "react";
import { SelectOption } from "@/components/MultiSelectWithSearch";
import { getBrandsFilters } from "@/actions/filters/getBrands";
import { getModelsFilters } from "@/actions/filters/getModels";

export const useFilters = () => {
  const [brands, setBrands] = useState<SelectOption<unknown>[] | null>(null);
  const [models, setModels] = useState<{ [x: string]: string[] } | null>(null);

  useEffect(() => {
    const getData = async () => {
      const options = await getBrandsFilters();
      if (options) {
        setBrands(options);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const options = await getModelsFilters();
      if (options) {
        setModels(options);
      }
    };
    getData();
  }, []);

  return { brands, models };
};
