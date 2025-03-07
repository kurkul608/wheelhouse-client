import React, { ReactNode, useEffect, useState } from "react";
import Select, { ActionMeta, MultiValue, StylesConfig } from "react-select";

export type SelectOption<T> = {
  value: string;
  label: string;
} & T;

const textStyles = {
  fontSize: "var(--tgui--text--font_size)",
  lineHeight: "var(--tgui--text--line_height)",
  fontWeight: "var(--tgui--font_weight--accent3)",
  color: "var(--tgui--text_color)",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: StylesConfig<SelectOption<any>, true> = {
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

export type MultiSelectWithSearchProps<T> = {
  options: MultiValue<SelectOption<T>>;
  defaultSelectedOptions?: MultiValue<SelectOption<T>>;
  placeholder?: string;
  onChange: (
    selectedOptions: MultiValue<SelectOption<T>>,
    actionMeta: ActionMeta<SelectOption<T>>,
  ) => void;
  head?: ReactNode;
  targetPortalId?: string;
  selectedOptions?: MultiValue<SelectOption<T>>;
  isSearchable?: boolean;
};

function MultiSelectWithSearch<T>({
  options,
  defaultSelectedOptions,
  placeholder,
  onChange,
  head,
  targetPortalId,
  selectedOptions: externalSelectedOptions,
  isSearchable = true,
}: MultiSelectWithSearchProps<T>) {
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<SelectOption<T>>
  >(externalSelectedOptions || defaultSelectedOptions || []);

  const handleChange = (
    newValue: MultiValue<SelectOption<T>>,
    actionMeta: ActionMeta<SelectOption<T>>,
  ) => {
    setSelectedOptions(newValue || []);
    onChange(newValue, actionMeta);
  };

  useEffect(() => {
    if (externalSelectedOptions) {
      setSelectedOptions(externalSelectedOptions);
    }
  }, [externalSelectedOptions]);

  return (
    <div>
      {head ? <div className={"mb-1"}>{head}</div> : null}
      <Select
        isMulti
        options={options}
        isSearchable={isSearchable}
        value={selectedOptions}
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

export default MultiSelectWithSearch;
