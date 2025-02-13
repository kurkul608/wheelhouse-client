import { Subheadline } from "@telegram-apps/telegram-ui";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { FC } from "react";
import { ActionMeta } from "react-select";
import { SelectOption } from "@/components/MultiSelectWithSearch";

interface YearFilterProps {
  onMinChange(
    selectedOption: SelectOption<unknown> | null,
    actionMeta: ActionMeta<SelectOption<unknown>>,
  ): void;
  onMaxChange(
    selectedOption: SelectOption<unknown> | null,
    actionMeta: ActionMeta<SelectOption<unknown>>,
  ): void;
  defaultMinOption: SelectOption<unknown>;
  defaultMaxOption: SelectOption<unknown>;
  targetPortalId?: string;
}
export const YearFilter: FC<YearFilterProps> = ({
  onMinChange,
  onMaxChange,
  defaultMaxOption,
  defaultMinOption,
  targetPortalId,
}) => {
  return (
    <>
      <Subheadline className={"px-[22px]"}>Год</Subheadline>
      <div className={"flex justify-between"}>
        <SingleSelectWithSearch
          options={Array.from(
            { length: new Date().getFullYear() - 2004 + 1 },
            (_, i) => 2004 + i,
          ).map(
            (year) =>
              ({
                value: String(year),
                label: String(year),
              }) as SelectOption<undefined>,
          )}
          onChange={onMinChange}
          placeholder={"Мин"}
          defaultSelectedOption={defaultMinOption}
          targetPortalId={targetPortalId}
        />
        {"-"}
        <SingleSelectWithSearch
          options={Array.from(
            { length: new Date().getFullYear() - 2004 + 1 },
            (_, i) => 2004 + i,
          ).map(
            (year) =>
              ({
                value: String(year),
                label: String(year),
              }) as SelectOption<undefined>,
          )}
          onChange={onMaxChange}
          placeholder={"Макс"}
          defaultSelectedOption={defaultMaxOption}
          targetPortalId={targetPortalId}
        />
      </div>
    </>
  );
};
