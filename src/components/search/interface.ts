import { IOption } from "../common";
import { FieldValues, Path } from "react-hook-form";

export type IOptionType = "input" | "select";

export interface IObjectFilter {
  [key: Path<FieldValues>]: any;
}

export interface IOptionFilter {
  optionKey: Path<FieldValues>;
  type: IOptionType;
  options?: IOption[];
  disabled?: boolean;
}

export interface ISearch {
  className?: string;
  options: IOptionFilter[];
  onFilter: (data: IObjectFilter) => void;
  disabled?: boolean;
}
