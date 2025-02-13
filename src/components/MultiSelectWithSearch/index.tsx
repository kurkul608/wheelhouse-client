import React, { ReactNode, useState } from "react";
import Select, { ActionMeta, MultiValue, StylesConfig } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

const textStyles = {
  fontSize: "var(--tgui--text--font_size)",
  lineHeight: "var(--tgui--text--line_height)",
  fontWeight: "var(--tgui--font_weight--accent3)",
  color: "var(--tgui--text_color)",
};

const customStyles: StylesConfig<SelectOption, true> = {
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
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    ...textStyles,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    ...textStyles,
    ":hover": {
      backgroundColor: "var(--tgui--text_color)",
      color: "var(--tgui--bg_color)",
    },
  }),
  // Стили для выпадающего списка (меню)
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
};

export interface MultiSelectWithSearchProps {
  options: MultiValue<SelectOption>;
  defaultSelectedOptions: MultiValue<SelectOption>;
  placeholder?: string;
  onChange: (
    selectedOptions: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  head?: ReactNode;
}

const MultiSelectWithSearch: React.FC<MultiSelectWithSearchProps> = ({
  options,
  defaultSelectedOptions,
  placeholder,
  onChange,
  head,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<SelectOption>
  >(defaultSelectedOptions);

  const handleChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    setSelectedOptions(newValue || []);
    onChange(newValue, actionMeta);
  };

  return (
    <div>
      {head ? <div className={"mb-1"}>{head}</div> : null}
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        className="w-full"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default MultiSelectWithSearch;
