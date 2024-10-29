import React from "react";
import { Pie } from "react-chartjs-2"; 
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js'; 


Chart.register(ArcElement, Title, Tooltip, Legend);

const PieChart: React.FC<{ chartData: any, title: string }> = ({ chartData, title }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `${title}`,
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
