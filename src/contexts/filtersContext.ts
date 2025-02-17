import { createContext } from "react";
import { SelectOption } from "@/components/MultiSelectWithSearch";

export const FiltersContext = createContext<{
  brands: SelectOption<unknown>[];
  models: { [x: string]: string[] };
}>({ brands: [], models: {} });
