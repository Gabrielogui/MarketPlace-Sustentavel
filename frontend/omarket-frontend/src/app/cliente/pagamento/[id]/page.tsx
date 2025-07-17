'use client'

import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pedido, Produto } from "@/core";
import { getPedido } from "@/service/pedido/pedidoService";
import { getProduto } from "@/service/produto/produtoService";
import { BanknoteIcon, BarcodeIcon, CreditCardIcon, LockIcon, PencilIcon, QrCodeIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

export interface ProdutoNoPagamento {
    id: number;
    nome: string;
    categoria: string;
    precoUnitario: number;
    quantidade: number;
    fornecedor: string;
    imagemUrl: string;
}

export default function Pagamento () {

    const { id } = useParams();
    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [produtosMap, setProdutosMap] = useState<Record<number, Produto>>({});

    useEffect(() => {
        if (!id) return;

        const fetchPedido = async () => {
            try {
                const { data } = await getPedido(Number(id));
                setPedido(data);

                const produtoIds = Array.from(new Set(data.itens.map(item => item.produtoId)));
                const promessas = produtoIds.map(id => getProduto(id).then(res => [id, res.data]));
                const produtos = await Promise.all(promessas);
                const produtoMap = Object.fromEntries(produtos);
                setProdutosMap(produtoMap);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Erro ao carregar o pedido.");
            }
        };

        fetchPedido();
    }, [id]);

    if (!pedido) return <div>Carregando pedido...</div>;

    const { subtotal, frete, valorTotal } = pedido;

    return(
        <div className="flex flex-col gap-10">
            {/* PAGAMENTO */}
            <div>
                <Label className="text-3xl font-bold">Pagamento</Label> 
            </div>
            {/* TABELA COM PRODUTOS PARA O PAGAMENTO + PREÇOS */}
            <div>
                <Table>
                    <Fragment>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produtos</TableHead>
                                <TableHead>Preço Unitário</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Preço Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pedido.itens.map(item => {
                                const produto = produtosMap[item.produtoId];
                                if (!produto) return null;

                                return (
                                    <TableRow key={item.produtoId}>
                                        <TableCell className="flex flex-row gap-5">
                                            <Image
                                                src="https://picsum.photos/100/100"
                                                alt={produto.nome}
                                                height={100}
                                                width={100}
                                                className="rounded-md"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-semibold">{produto.nome}</Label>
                                                <Label className="text-gray-500 text-sm">Categoria: (Categoria)</Label>
                                            </div>
                                        </TableCell>
                                        <TableCell>R$ {item.precoUnitario.toFixed(2)}</TableCell>
                                        <TableCell>{item.quantidade}</TableCell>
                                        <TableCell>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Fragment>
                </Table>
            </div>
            {/* INFORMÇÃO DO PREÇO TOTAL OU ALTERAÇÃO DO ENDEREÇO */}
            <div className="flex flex-row gap-2 justify-end">
                <Label>Preço Total:</Label>
                <Label>R$ {valorTotal.toFixed(2)}</Label>
            </div>
            {/* FINALIZAÇÃO DO PAGAMENTO */}
            <div className="border rounded-xl p-6 bg-white shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Resumo do Pedido */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete:</span>
                                <span className="font-medium">R$ {(frete ?? 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t">
                                <span className="font-bold">Total:</span>
                                <span className="font-bold text-lg">R$ {(subtotal + (frete ?? 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center mt-4 text-green-600">
                                <TruckIcon className="w-5 h-5 mr-2" />
                                <span>Chegará em 5 dias úteis</span>
                            </div>
                        </div>
                    </div>

                    {/* Informações de Entrega e Pagamento */}
                    <div>
                        {/* Endereço de Entrega */}
                        <div className="mb-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold">Endereço de Entrega</h2>
                                <button className="text-blue-500 hover:text-blue-700 flex items-center cursor-pointer">
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    Alterar
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">Universidade do Estado da Bahia</p>
                                <p>Rua Silveira Martins, 1234</p>
                                <p>CEP: 12345-123</p>
                            </div>
                        </div>

                        {/* Método de Pagamento */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Método de Pagamento</h2>
                            <div className="grid grid-cols-4 gap-2">
                                <button className="border rounded-lg p-3 flex flex-col items-center hover:border-blue-400 cursor-pointer">
                                    <CreditCardIcon className="w-6 h-6 mb-1" />
                                    <span className="text-xs">Crédito</span>
                                </button>
                                <button className="border rounded-lg p-3 flex flex-col items-center hover:border-blue-400 cursor-pointer">
                                    <BanknoteIcon className="w-6 h-6 mb-1" />
                                    <span className="text-xs">Débito</span>
                                </button>
                                <button className="border rounded-lg p-3 flex flex-col items-center hover:border-blue-400 cursor-pointer">
                                    <BarcodeIcon className="w-6 h-6 mb-1" />
                                    <span className="text-xs">Boleto</span>
                                </button>
                                <button className="border rounded-lg p-3 flex flex-col items-center hover:border-blue-400 cursor-pointer">
                                    <QrCodeIcon className="w-6 h-6 mb-1" />
                                    <span className="text-xs">PIX</span>
                                </button>
                            </div>
                        </div>

                        {/* Botão de Pagamento */}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition duration-200 flex items-center justify-center cursor-pointer">
                            <LockIcon className="w-5 h-5 mr-2" />
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}