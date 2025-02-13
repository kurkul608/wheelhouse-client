import { SelectOption } from "@/components/MultiSelectWithSearch";

export const CAR_BRANDS_FILTER_OPTIONS: SelectOption<unknown>[] = [
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Audi", label: "Audi" },
  { value: "Bentley", label: "Bentley" },
  { value: "BMW", label: "BMW" },
  { value: "Bugatti", label: "Bugatti" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Land Rover", label: "Land Rover" },
  { value: "Lexus", label: "Lexus" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Porsche", label: "Porsche" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "Toyota", label: "Toyota" },
  { value: "Volkswagen", label: "Volkswagen" },
];

export type CarBrandsFilterType =
  | "Aston Martin"
  | "Audi"
  | "Bentley"
  | "BMW"
  | "Bugatti"
  | "Ferrari"
  | "Lamborghini"
  | "Land Rover"
  | "Lexus"
  | "Mercedes-Benz"
  | "Porsche"
  | "Rolls-Royce"
  | "Toyota"
  | "Volkswagen";
