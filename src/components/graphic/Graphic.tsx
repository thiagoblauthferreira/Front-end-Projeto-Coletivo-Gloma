import React, { useEffect, useState } from "react";
import { IProductInventory } from "../../interfaces/statistics";
import BarChart from "./DoughnutChart";


// Definindo a interface para as props
interface GraphicProps {
  data: IProductInventory;
}

// Defina a estrutura do dataset do gráfico
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const Graphic: React.FC<GraphicProps> = ({ data }) => {
  // Explicitando o tipo do estado como ChartData
  const [datas, setDatas] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const products = data.products || [];
    const labels = products.map((d) => d.name);
    const quantities = products.map((d) => d.qtd);

    setDatas({
      labels: labels,
      datasets: [
        {
          data: quantities,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <BarChart chartData={datas} />
    </div>
  );
};

export default Graphic;
