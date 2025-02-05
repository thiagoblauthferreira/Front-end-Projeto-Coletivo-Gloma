import React from "react";
import { Bar } from "react-chartjs-2"; 
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importando os elementos necessários


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[]; 
      borderWidth?: number; 
    }[];
  };
  width?: number;  // Permitindo que o tamanho seja configurado
  height?: number; // Permitindo que a altura também seja configurada
}

const BarChart: React.FC<BarChartProps> = ({ chartData, width = 1000, height = 500 }) => {
  return (
    <div style={{ width, height}}>
      <Bar data={chartData} 
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
      />
    </div>
  );
};

export default BarChart;
