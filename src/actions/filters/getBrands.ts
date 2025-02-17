"use server";

import axios from "axios";
import { SelectOption } from "@/components/MultiSelectWithSearch";

export const getBrandsFilters = async () => {
  try {
    const brands = await axios.get<SelectOption<unknown>[]>(
      `${process.env.API_URL}filters/car-brands`,
    );
    return brands.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
