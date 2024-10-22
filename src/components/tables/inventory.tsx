
import { ITable } from "../../interfaces/default";
import { Table } from "../common";
import { IColumn } from "../common/Table/interface";
import { productTypeTranslations } from "./translate";

export interface ITableInventoryProps extends ITable {
  handleDeleteProduct: (productId: string) => void;
  handleUpdateProduct: (productId: string) => void;
  handleDonorProduct?: (productId: string) => void;
}

export function TableInventory({
  handleDeleteProduct,
  handleUpdateProduct,
  handleDonorProduct,
  dataSource,
  ...props
}: ITableInventoryProps) {

  const columns: IColumn[] = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (name: string) => {
        return <p>{name}</p>;
      },
    },
    {
      title: "Tipo",
      dataIndex: "type",
      render: (type) => {
        // Usando o mapeamento para traduzir o tipo
        return <p>{productTypeTranslations[type] || type}</p>; 
      },
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      render: (quantity: number) => {
        return <p>{quantity}</p>;
      },
    },
    {
      title: "Peso",
      dataIndex: "weight",
      render: (weight: string) => {
        return <p>{weight}</p>;
      },
    },    
  ];
  return <Table {...props} columns={columns} dataSource={dataSource} />;
}
