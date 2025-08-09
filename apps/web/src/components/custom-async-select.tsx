import clsx from "clsx";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import type { GenericLabelValue } from "@/types/common";

const controlStyles = {
  base: "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
  invalid: "!border-destructive ring-destructive/20 focus-visible:ring-destructive/20",
  focus: "border-ring ring-[3px] ring-ring/50",
  nonFocus: "",
};
const placeholderStyles = "text-muted-foreground text-base md:text-sm";
const selectInputStyles = "text-foreground text-base md:text-sm";
const valueContainerStyles = "flex items-center gap-1 px-0 py-0";
const singleValueStyles = "text-foreground text-base md:text-sm";
const multiValueStyles = "bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-sm flex items-center gap-1";
const multiValueLabelStyles = "";
const multiValueRemoveStyles = "hover:bg-secondary-foreground/20 rounded px-1";
const indicatorsContainerStyles = "flex items-center";
const clearIndicatorStyles = "text-muted-foreground hover:text-foreground p-1 cursor-pointer";
const indicatorSeparatorStyles = "hidden";
const dropdownIndicatorStyles = "text-muted-foreground hover:text-foreground p-1 cursor-pointer";
const menuStyles = "bg-popover border border-border rounded-md shadow-lg mt-1 py-1 z-50";
const groupHeadingStyles = "text-muted-foreground text-sm font-medium px-3 py-2";
const optionStyles = {
  base: "px-3 py-2 text-base md:text-sm cursor-pointer transition-colors",
  focus: "bg-accent text-accent-foreground",
  selected: "bg-primary text-primary-foreground",
};
const noOptionsMessageStyles = "text-muted-foreground px-3 py-2 text-base md:text-sm";

interface CustomAsyncSelectProps<T> {
  isInvalid?: boolean;
  placeholder: string;
  clearable: boolean;
  loadOptions: (inputValue: string, callback: (options: GenericLabelValue<T>[]) => void) => void;
  value: GenericLabelValue<T> | undefined;
  onChange: (value: GenericLabelValue<T> | undefined) => void;
}

const CustomAsyncSelect = <T,>({
  isInvalid,
  placeholder,
  clearable,
  loadOptions,
  value,
  onChange,
}: CustomAsyncSelectProps<T>) => {
  const [defaultOptions, setDefaultOptions] = useState<GenericLabelValue<T>[]>([]);

  // Load initial options when component mounts
  useEffect(() => {
    loadOptions("", (options) => {
      setDefaultOptions(options);
    });
  }, [loadOptions]);

  return (
    <AsyncSelect
      unstyled
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isInvalid && controlStyles.invalid,
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      placeholder={placeholder}
      isClearable={clearable}
      cacheOptions
      loadOptions={loadOptions}
      value={value || null}
      defaultOptions={defaultOptions}
      onChange={(value) => {
        onChange((value || undefined) as GenericLabelValue<T> | undefined);
      }}
    />
  );
};

export default CustomAsyncSelect;
