'use client'

import SelecaoFrete from "@/components/pedido/SelecaoFrete";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fornecedor, Pedido, Produto } from "@/core"; // Certifique-se que esses tipos existem em seu core
import { OpcaoFreteResponse } from "@/core/frete";
import { getPedido } from "@/service/pedido/pedidoService";
import { getProduto } from "@/service/produto/produtoService";
import { getFornecedor } from "@/service/usuario/userService";
import { BanknoteIcon, BarcodeIcon, CreditCardIcon, LockIcon, PencilIcon, QrCodeIcon } from "lucide-react";
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

export default function Pagamento() {
    const params = useParams();
    const id = params.id as string;

    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [produtosMap, setProdutosMap] = useState<Record<number, Produto>>({});
    const [valorFrete, setValorFrete] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
    
    useEffect(() => {
        if (!id) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                // 1. Busca o pedido
                const { data: pedidoData } = await getPedido(Number(id));
                setPedido(pedidoData);

                if (pedidoData.frete) {
                    setValorFrete(pedidoData.frete.valor);
                }

                if (pedidoData.itens.length === 0) {
                    toast.error("Este pedido não contém itens.");
                    setLoading(false);
                    return;
                }

                // 2. Busca os detalhes dos produtos
                const produtoIds = [...new Set(pedidoData.itens.map(item => item.produtoId))];
                const promessasProdutos = produtoIds.map(id => getProduto(id).then(res => [id, res.data]));
                const produtosArray = await Promise.all(promessasProdutos);
                const pMap = Object.fromEntries(produtosArray);
                setProdutosMap(pMap);
                
                // 3. Pega o ID do fornecedor do primeiro produto (todos são do mesmo)
                const primeiroProduto = pMap[produtoIds[0]];
                if (!primeiroProduto) throw new Error("Não foi possível carregar os detalhes do produto.");

                // 4. Busca os dados do fornecedor
                const { data: fornecedorData } = await getFornecedor(primeiroProduto.fornecedorId);
                setFornecedor(fornecedorData);
                console.log("Fornecedor carregado:", fornecedorData);

            } catch (error: any) {
                toast.error(error.response?.data?.message || "Erro ao carregar os dados para pagamento.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    const handleFreteUpdate = (frete: OpcaoFreteResponse) => {
        setValorFrete(frete.price);
        // Opcional: Recarregar os dados do pedido para ter certeza que o total no backend está atualizado
        getPedido(Number(id)).then(({ data }) => setPedido(data));
    };

    if (loading || !pedido) return <div>Carregando informações do pagamento...</div>;

    const subtotal = pedido.subtotal;
    const total = subtotal + (valorFrete ?? 0);

    return (
        <div className="flex flex-col gap-10">
            <div>
                <Label className="text-3xl font-bold">Pagamento do Pedido #{pedido.id}</Label> 
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
                <Label>R$ {total.toFixed(2)}</Label>
            </div>
            {/* FINALIZAÇÃO DO PAGAMENTO */}
            <div className="border rounded-xl p-6 bg-white shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Coluna da Esquerda: Resumo e Frete */}
                    <div className="flex flex-col gap-6">
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between"><span>Subtotal:</span><span className="font-medium">R$ {subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Frete:</span><span className="font-medium">R$ {(valorFrete ?? 0).toFixed(2)}</span></div>
                                <div className="flex justify-between pt-3 border-t"><span className="font-bold text-lg">Total:</span><span className="font-bold text-xl text-green-600">R$ {total.toFixed(2)}</span></div>
                            </div>
                        </div>
                        {/* ===== COMPONENTE DE FRETE INTEGRADO AQUI ===== */}
                        {fornecedor && fornecedor.enderecoDTO?.cep ? (
                            <SelecaoFrete 
                                pedido={pedido} 
                                cepOrigem={fornecedor.enderecoDTO.cep}
                                onFreteSelecionado={handleFreteUpdate}
                            />
                        ) : (
                            // Mensagem exibida se, após o loading, o CEP não for encontrado
                            <div className="text-muted-foreground text-sm p-4 border rounded-lg bg-gray-50">
                                <p className="font-semibold">Endereço do Fornecedor Indisponível</p>
                                <p>Não foi possível calcular o frete no momento.</p>
                            </div>
                        )}
                    </div>

                    {/* Coluna da Direita: Entrega e Pagamento */}
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
                                <p className="font-medium">{pedido.cliente.nome}</p>
                                <p>CEP: {pedido.endereco?.cep}</p>
                                <p>Número: {pedido.endereco?.numero}</p>
                                <p>Complemento: {pedido.endereco?.complemento}</p>
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