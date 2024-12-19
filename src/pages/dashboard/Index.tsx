import { useEffect, useState } from "react";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { listProducts, updateProduct } from "../../services/products.service";
import { IProduct, IProductUpdate } from "../../interfaces/products";
import { PieChart, BarChart } from "../../components/charts";
import { toast } from "react-toastify";
import { useAuthProvider } from "../../context/Auth";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCharts, setShowCharts] = useState<boolean>(false); // Estado para exibir/ocultar gráficos

  const { currentUser } = useAuthProvider();

  useEffect(() => {
    fetchProducts();
  }, []);
  
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
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedStatus, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await listProducts({});
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      console.error("Erro ao carregar os produtos:", err);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (productId: string, newStatus: string) => {
    if (!currentUser || !currentUser.isCoordinator) {
      toast.error("Acesso negado. Apenas coordenadores podem alterar o status.");
      return;
    }

    const confirm = window.confirm(
      `Tem certeza que deseja alterar o status para "${newStatus}"?`
    );

    if (!confirm) return;

    try {
      const data: IProductUpdate = { status: newStatus };
      const response = await updateProduct(productId, data);

      if (response.success) {
        toast.success("Status atualizado com sucesso!");
        fetchProducts();
      } else {
        toast.error("Erro ao atualizar o status.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar o status.");
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
          onChange={(e) => setSelectedStatus(e.target.value || (''))}
          className="p-2 border border-gray-300 rounded mr-4"
        >
          <option value="">Filtrar por Status</option>
          <option value="Solicitado">Solicitado</option>
          <option value="Recebido">Recebido</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Pendente">Pendente</option>
        </select>

        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || (''))}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filtrar por Categoria</option>
          <option value="Perecível">Perecível</option>
          <option value="Não Perecível">Não Perecível</option>
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
                <button
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                  onClick={() => handleUpdateStatus(product.id, "Aprovado")}
                >
                  Aprovar
                </button>
                <button
                  className="mt-2 p-2 bg-red-500 text-white rounded"
                  onClick={() => handleUpdateStatus(product.id, "Reprovado")}
                >
                  Reprovar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Gráficos */}
        <div>
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="p-2 bg-gray-300 rounded mb-4"
          >
            {showCharts ? "Ocultar Gráficos" : "Exibir Gráficos"}
          </button>
          {showCharts && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <PieChart chartData={pieChartData} title="Distribuição de Status" />
              </div>
              <div className="w-full md:w-1/2">
                <BarChart chartData={barChartData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
