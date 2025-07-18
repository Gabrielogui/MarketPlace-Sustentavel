'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { Pedido, Produto } from "@/core";
import { cancelarPedido, getListaPedidoPorCliente } from "@/service/pedido/pedidoService";
import { getProduto } from "@/service/produto/produtoService";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function MeusPedidos () {

    const { user } = useContext(AuthContext);

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [produtosMap, setProdutosMap] = useState<Record<number, Produto>>({});
    const [cancelando, setCancelando] = useState(false);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                if(!user) return;
                const clienteId = user?.id;
                const { data } = await getListaPedidoPorCliente(clienteId);
                setPedidos(data);

                // Carrega os produtos únicos
                const produtoIds = Array.from(new Set(data.flatMap(p => p.itens.map(i => i.produtoId))));
                const promessas = produtoIds.map(id => getProduto(id).then(res => [id, res.data]));
                const produtos = await Promise.all(promessas);
                const produtoMap = Object.fromEntries(produtos);
                setProdutosMap(produtoMap);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Erro ao buscar pedidos:", error);
                toast.error("Erro ao carregar pedidos.");
            }
        };

        fetchPedidos();
    }, []);
    
    // |=======| MÉTODO PARA CANCELAR PEDIDO |=======|
    const handleCancelar = async (pedidoId: number) => {
        setCancelando(true);
        try{
            await cancelarPedido(pedidoId);
            toast.success("Pedido cancelado com sucesso. Agora o status dele é de Cancelado");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Falha ao cancelar pedido!");
        } finally {
            setCancelando(false);
        }
    }

    return(
        <div className="flex flex-col gap-10">
            <Label className="text-3xl font-bold">Meus Pedidos</Label>

            {pedidos.length === 0 ? (
                <p className="text-lg text-gray-500">Você ainda não fez nenhum pedido.</p>
            ) : (
                pedidos.map(pedido => (
                    <div key={pedido.id} className="flex flex-col gap-8 border rounded-lg p-4">
                        {/* Info do Pedido */}
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                                <Label>{new Date(pedido.dataPedido).toLocaleDateString()}</Label>
                                <Label>R$ {pedido.valorTotal.toFixed(2)}</Label>
                                <Label>Status: {pedido.status}</Label>
                                <Label>ID: {pedido.id}</Label>
                            </div>
                            <Button variant="outline" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCancelar(pedido.id);
                                }}>
                                <Trash2 className="mr-2" />
                                {cancelando ? "Cancelando..." : "Cancelar Pedido"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5">
                            {pedido.itens.map(item => {
                                const produto = produtosMap[item.produtoId];
                                return produto ? (
                                    <div
                                        key={item.produtoId + '-' + pedido.id}
                                        className="flex flex-col justify-between hover:shadow-md transition-shadow p-4 border rounded-lg w-full max-w-sm group"
                                    >
                                        <div className="flex flex-row gap-4">
                                            <Image 
                                                src="https://picsum.photos/150/150"
                                                alt={produto.nome}
                                                width={150}
                                                height={150}
                                                className="rounded-md"
                                            />
                                            <div className="flex flex-col justify-between gap-2">
                                                <h3 className="text-xl font-semibold">{produto.nome}</h3>
                                                <p className="text-sm text-gray-600">Categoria: (Categoria)</p>
                                                <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}