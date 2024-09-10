import React from "react";
import { IObjectFilter, IOptionFilter, ISearch } from "./interface";
import { Input, Select } from "../common";

const Option = ({
  optionKey,
  type,
  disabled,
  options,
  onFilter,
}: IOptionFilter & { onFilter: Function }) => {
  const organizedKey = optionKey.replace(/\s+/g, "_");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onFilter(organizedKey, event.target.value);
  };

  switch (type) {
    case "input":
      return (
        <Input disabled={disabled} placeholder="Pesquisar" onChange={handleChange} />
      );
    case "select":
      return (
        <Select disabled={disabled} onChange={handleChange} options={options || []} />
      );
    default:
      return null;
  }
};

export function Search({ className, options, disabled, onFilter }: ISearch) {
  const filterRef = React.useRef<IObjectFilter>({});

  const handleFilter = (key: string, value: any) => {
    filterRef.current[key] = value;
    onFilter({ ...filterRef.current });
  };

  return (
    <div className={`grid gap-3 grid-cols-1 md:grid-cols-3 ${className}`}>
      {options.map((option) => (
        <Option
          key={`search-filter-${option.optionKey}-${option.type}`}
          disabled={disabled}
          onFilter={handleFilter}
          {...option}
        />
      ))}
    </div>
  );
}
