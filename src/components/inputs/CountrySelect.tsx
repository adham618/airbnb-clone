"use client";

import Select from "react-select";

import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value: CountrySelectValue | null;
  onChange: (value: CountrySelectValue | null) => void;
};

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAll } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value)}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-3">
          <span className="text-3xl">{option.flag}</span>
          <span className="ml-1 text-neutral-500">
            {option.label}, <span>{option.region}</span>
          </span>
        </div>
      )}
      classNames={{
        control: () => "border-2 p-3",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}
