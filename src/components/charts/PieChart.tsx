import React from "react";
import { Pie } from "react-chartjs-2"; 
import { Chart, ChartOptions, ChartData, ArcElement, Title, Tooltip, Legend } from 'chart.js'; 


Chart.register(ArcElement, Title, Tooltip, Legend);

interface PieChartProps {
  chartData: ChartData<'pie'>;
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ chartData, title }) => {
  const options: ChartOptions<'pie'> = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
        position: 'top' as const, 
      },
    },
  };
  return (
    <div style={{ width: 300 }}>
      <Pie data={chartData} options={options}/>
    </div>
  );
};

export default PieChart;
