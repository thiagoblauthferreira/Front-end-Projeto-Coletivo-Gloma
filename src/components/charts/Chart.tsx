import React, { useEffect, useState } from "react";
import { IProductInventory } from "../../interfaces/statistics";
import BarChart from "./BarChart";
import { productTypeTranslations } from "../tables/translate";
import { colors } from "./colors";
import PieChart from "./PieChart";

interface GraphicProps {
  data: IProductInventory;
  type: "food" | "not_food";
}

interface Product {
  name: string;
  qtd: number;
  weight?: number; 
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}


const Chart: React.FC<GraphicProps> = ({ data, type}) => {
  
  const [datas, setDatas] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Título',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  // Função para gerar os gráficos de pizza de forma reutilizável
  const generatePieData = (products: Product[], label: string, isWeight: boolean = false) => {
    const values = products.map((product) =>
      isWeight && product.weight ? product.weight : product.qtd
    );

    return {
      labels: products.map((product) => productTypeTranslations[product.name]),
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: ['rgba(0, 0, 0, 1)'],
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    let title: string = 'title'
    let products: Product[] = []; 
    let labels: string[] = []; 
    let quantities: number[] = []; 

    
    if(type === 'not_food'){
      title = 'não alimentícios';
      products = data.products || [];
      labels = products.map((d) => productTypeTranslations[d.name]);
      quantities = products.map((d) => d.qtd);   
    }

    if(type === 'food'){
      title = 'alimentícios';
      products = data.productsFood || [];
      labels = products.map((d) => productTypeTranslations[d.name]);
      quantities = products.map((d) => d.qtd);   
    }
    
    // Só atualiza o estado se houver mudança nos dados
    setDatas((prevState) => {
      if (
        prevState.labels.toString() !== labels.toString() ||
        prevState.datasets[0].data.toString() !== quantities.toString()
      ) {
        return {
          labels: labels,
          datasets: [
            {
              label: `Dados referentes a produtos ${title} doados.`,
              data: quantities,
              backgroundColor: colors,
              borderColor: ["rgba(0, 0, 0, 1)"],
              borderWidth: 1,
            },
          ],
        };
      }
      return prevState;
    });
  }, [data, type]);

  return (
    <div>
      {type === "not_food" ? (
        <BarChart chartData={datas} />
      ) : (
        <>
          {/* Gráfico de Pizza para Quantidade */}
          <PieChart chartData={generatePieData(data.productsFood, "Gráfico de alimentos em quantidade")} title={"Gráfico de alimentos em quantidade"} />
          
          {/* Gráfico de Pizza para Peso */}
          <PieChart 
            chartData={generatePieData(data.productsFood, "Gráfico de alimentos em peso", true)} 
            title={"Gráfico de alimentos em peso"} 
          />
        </>
      )}
    </div>
  );
};

export default Chart;
