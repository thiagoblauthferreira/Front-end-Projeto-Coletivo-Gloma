export interface IPaginate {
  offset: number;
  currentPage: number;
  limit: number;
}

export interface IColumn {
  title: string;
  dataIndex: string;
  disabled?: boolean;
  render: (event: any) => React.ReactNode;
}

export interface ITableProps {
  columns: IColumn[];
  dataSource: { [key: string]: any }[];
  rowKey?: string;
  requesting?: boolean;
  limit?: number;
  total?: number;
  onPaginate?: (pagination: IPaginate) => void;
  textNotFound?: string;
  maxPagesToShow?: number;
}
