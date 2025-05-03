"use client";

import { Controller, Control } from "react-hook-form";
import Select, { MultiValue, SingleValue, ActionMeta, Props as SelectProps } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface IFormSelectProps extends Partial<SelectProps<OptionType>> {
  name: string;
  label?: string;
  control: Control<any>;
  options: OptionType[];
  multiple?: boolean;
}

const EFormSelect = ({
  name,
  label,
  control,
  options,
  multiple = false,
  ...rest
}: IFormSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          {label && <label>{label}</label>}
          <Select
            {...field}
            {...rest}
            options={options}
            isMulti={multiple}
            className="mt-1"
            onChange={(
              newValue: MultiValue<OptionType> | SingleValue<OptionType>,
              _actionMeta: ActionMeta<OptionType>
            ) => {
              field.onChange(
                multiple
                  ? (newValue as MultiValue<OptionType>)?.map((s) => s.value)
                  : (newValue as SingleValue<OptionType>)?.value
              );
            }}
            value={
              multiple
                ? options.filter((option) =>
                    field.value?.includes(option.value)
                  )
                : options.find((option) => option.value === field.value) || null
            }
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#09090B",
                color: "#fff",
                borderColor: "#7B3AED",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#09090B",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? "#333" : "#09090B",
                color: "#fff",
                cursor: "pointer",
              }),
              input: (base) => ({
                ...base,
                color: "#fff",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#aaa",
              }),
            }}
          />
        </div>
      )}
    />
  );
};

export default EFormSelect;
