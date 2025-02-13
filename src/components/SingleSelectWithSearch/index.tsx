import React, { ReactNode, useState } from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";
import { SelectOption } from "@/components/MultiSelectWithSearch";

const textStyles = {
  fontSize: "var(--tgui--text--font_size)",
  lineHeight: "var(--tgui--text--line_height)",
  fontWeight: "var(--tgui--font_weight--accent3)",
  color: "var(--tgui--text_color)",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: StylesConfig<SelectOption<any>, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--tgui--bg_color)",
    border: "1px solid var(--tgui--bg_color)",
    borderRadius: "12px",
    boxShadow: state.isFocused ? "0 0 0 1px #2684FF" : "none",
    "&:hover": {
      borderColor: "var(--tgui--bg_color)",
    },
  }),
  input: (provided) => ({
    ...provided,
    ...textStyles,
  }),
  placeholder: (provided) => ({
    ...provided,
    ...textStyles,
    color: "var(--tg-theme-hint-color)",
  }),
  singleValue: (provided) => ({
    ...provided,
    ...textStyles,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--tgui--bg_color)",
    color: "var(--tgui--text_color)",
    borderRadius: "12px",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "var(--tgui--bg_color)",
    color: "var(--tgui--text_color)",
    borderRadius: "12px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(38, 132, 255, 0.1)"
      : "var(--tgui--bg_color)",
    ...textStyles,
    cursor: "pointer",
    ":active": {
      backgroundColor: state.isSelected
        ? "rgba(38, 132, 255, 0.2)"
        : "var(--tgui--bg_color)",
    },
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

export type SingleSelectWithSearchProps<T> = {
  options: SelectOption<T>[];
  defaultSelectedOption?: SelectOption<T> | null;
  placeholder?: string;
  onChange: (
    selectedOption: SelectOption<T> | null,
    actionMeta: ActionMeta<SelectOption<T>>,
  ) => void;
  head?: ReactNode;
  targetPortalId?: string;
};

function SingleSelectWithSearch<T>({
  options,
  defaultSelectedOption = null,
  placeholder,
  onChange,
  head,
  targetPortalId,
}: SingleSelectWithSearchProps<T>) {
  const [selectedOption, setSelectedOption] = useState<SelectOption<T> | null>(
    defaultSelectedOption,
  );

  const handleChange = (
    newValue: SelectOption<T> | null,
    actionMeta: ActionMeta<SelectOption<T>>,
  ) => {
    setSelectedOption(newValue);
    onChange(newValue, actionMeta);
  };

  return (
    <div>
      {head ? <div className="mb-1">{head}</div> : null}
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={
          typeof document !== "undefined"
            ? targetPortalId
              ? document.getElementById(targetPortalId)
              : document.body
            : null
        }
        menuPosition="fixed"
        menuPlacement="auto"
      />
    </div>
  );
}

export default SingleSelectWithSearch;
