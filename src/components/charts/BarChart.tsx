import React from "react";
import { Bar } from "react-chartjs-2"; 
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importando os elementos necessários


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  return (
    <div style={{ width: 1000 }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
