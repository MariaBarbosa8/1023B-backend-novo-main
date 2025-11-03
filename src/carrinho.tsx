import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

interface ItemCarrinho {
  _id: string;
  produto: {
    _id: string;
    nome: string;
    preco: number;
  };
  quantidade: number;
}

function Carrinho() {
  const [carrinho, setCarrinho] = useState<{itens: ItemCarrinho[], total: number}>({ itens: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    try {
      const res = await api.get("/carrinho");
      setCarrinho(res.data);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  };

  // B3 - Função para excluir carrinho inteiro
  const limparCarrinho = async () => {
    if (!window.confirm("Tem certeza que deseja esvaziar todo o carrinho?")) return;
    
    setLoading(true);
    try {
      await api.delete("/carrinho");
      setCarrinho({ itens: [], total: 0 });
      alert("Carrinho esvaziado com sucesso!");
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao limpar carrinho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meu Carrinho</h1>
          {carrinho.itens.length > 0 && (
            <button
              onClick={limparCarrinho}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              {loading ? "Esvaziando..." : "🗑️ Esvaziar Carrinho"}
            </button>
          )}
        </div>

        {carrinho.itens.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {carrinho.itens.map((item) => (
                <div key={item._id} className="border rounded p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.produto.nome}</h3>
                    <p className="text-gray-600">Quantidade: {item.quantidade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">R$ {item.produto.preco} cada</p>
                    <p className="font-bold text-green-600">
                      R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total do Carrinho:</span>
                <span className="text-xl font-bold text-green-600">
                  R$ {carrinho.total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Carrinho;