import { ITableProps } from "../components/common/Table/interface";

export interface ITable extends Omit<ITableProps, "columns"> {}

export interface IParamsDefault {
  limit?: number | string;
  offset?: number | string;
  sortBy?: string;
  sort?: string;
  search?: string;
}
