import { useEffect, useState } from "react";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { listProducts } from "../../services/products.service";
import { IProduct } from "../../interfaces/products";
import { PieChart, BarChart } from "../../components/charts";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Adicionando estado de busca
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Estado para status filtrado
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Estado para categoria filtrada

  // Efeito para chamar a função de busca
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função de filtro
  const handleSearch = () => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus) {
      result = result.filter(product => product.status === selectedStatus);
    }

    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(result);
  };

  // Função para lidar com mudança nos filtros
  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedStatus, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await listProducts({});
      setProducts(response.data);
    } catch (err) {
      console.error("Erro ao carregar os produtos:", err);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setIsLoading(false);
    }
  };

  const pieChartData = {
    labels: ["Aprovados", "Reprovados", "Pendente"],
    datasets: [
      {
        data: [
          products.filter(product => product.status === "Approved").length,
          products.filter(product => product.status === "Rejected").length,
          products.filter(product => product.status === "Pending").length,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  };
  
  const barChartData = {
    labels: ["Categoria 1", "Categoria 2", "Categoria 3"],
    datasets: [
      {
        label: "Produtos",
        data: [
          products.filter(product => product.category === "Categoria 1").length,
          products.filter(product => product.category === "Categoria 2").length,
          products.filter(product => product.category === "Categoria 3").length,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
      },
    ],
  };

  if (isLoading) {
    return <LoadingScreen loading={isLoading} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Painel de Controle</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Filtros de Busca */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nome do produto"
          className="p-2 border border-gray-300 rounded mr-4"
        />

        <select
          value={selectedStatus || ""}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="p-2 border border-gray-300 rounded mr-4"
        >
          <option value="">Filtrar por Status</option>
          <option value="requested">Solicitado</option>
          <option value="received">Recebido</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Pendente">Pendente</option>
        </select>

        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filtrar por Categoria</option>
          <option value="perishable">Perecível</option>
          <option value="non_perishable">Não Perecível</option>
        </select>
      </div>

      {/* Produtos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          <ul className="space-y-2">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="p-2 bg-gray-100 rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-600">Status: {product.status}</p>
                <p className="text-sm text-gray-600">Categoria: {product.category}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Gráficos */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <PieChart chartData={pieChartData} title={""} />
          </div>
          <div className="w-full md:w-1/2">
            <BarChart chartData={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
