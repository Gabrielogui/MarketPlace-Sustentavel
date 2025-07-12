'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { getMeuCarrinho } from "@/service/carrinho/carrinhoService";
import { toast } from "sonner";
import { getProduto } from "@/service/produto/produtoService";

// Interface para combinar dados do carrinho e do produto para exibição
export interface ProdutoNoCarrinho {
    id: number;
    nome: string;
    categoriaId: number;
    precoUnitario: number;
    quantidade: number;
    fornecedor: string; // Usaremos o ID do fornecedor por enquanto
    imagemUrl: string;
}

export default function CarrinhoPage() {
    const [itensDetalhados, setItensDetalhados] = useState<ProdutoNoCarrinho[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchCarrinhoEProdutos = async () => {
            try {
                // 1. Busca o carrinho
                const { data: carrinho } = await getMeuCarrinho();

                if (!carrinho || carrinho.itens.length === 0) {
                    setItensDetalhados([]);
                    return;
                }

                // 2. Cria uma lista de promessas para buscar os detalhes de cada produto
                const promessasProdutos = carrinho.itens.map(item => 
                    getProduto(item.produtoId).then(res => ({
                        ...res.data, // Detalhes do produto (nome, preço, etc.)
                        quantidade: item.quantidade // Quantidade vinda do carrinho
                    }))
                );
                
                // 3. Aguarda todas as buscas de produtos terminarem
                const produtosCompletos = await Promise.all(promessasProdutos);

                // 4. Formata os dados para a nossa interface de exibição
                const itensFormatados = produtosCompletos.map(p => ({
                    id: p.id,
                    nome: p.nome,
                    categoriaId: 222,
                    precoUnitario: p.preco,
                    quantidade: p.quantidade,
                    fornecedor: "Fornecedor", // Usando ID como placeholder
                    imagemUrl: 'https://picsum.photos/100/100', // Imagem mock
                }));

                setItensDetalhados(itensFormatados);
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Erro ao buscar carrinho:", error);
                toast.error(error.response?.data?.message || "Não foi possível carregar o carrinho.");
            } finally {
                setLoading(false);
            }
        };

        fetchCarrinhoEProdutos();
    }, []);
    
    // Agrupa os produtos por fornecedor usando 'useMemo' para otimização
    const grouped = useMemo(() => {
        return itensDetalhados.reduce<Record<string, ProdutoNoCarrinho[]>>((acc, p) => {
            (acc[p.fornecedor] ||= []).push(p);
            return acc;
        }, {});
    }, [itensDetalhados]);

    // Calcula o preço total dos itens selecionados
    const precoTotal = useMemo(() => {
        return itensDetalhados
            .filter(item => selected.has(item.id))
            .reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
    }, [itensDetalhados, selected]);

    // Funções de seleção (selecionaUm, selecionaGrupo, selecionaTodos) permanecem as mesmas...
    const selecionaUm = (id:number) => {
        const next = new Set(selected);
        if(next.has(id)) next.delete(id);
        else next.add(id);
        setSelected(next);
    }
    const selecionaGrupo = (fornecedor:string) => {
        const ids = grouped[fornecedor].map(produto => produto.id);
        const produtoAgrupado = ids.every(id => selected.has(id));
        const next = new Set(selected);
        ids.forEach(id => {
            if (produtoAgrupado) next.delete(id);
            else next.add(id);
        });
        setSelected(next);
    }
    const selecionaTodos = () => {
        if (selected.size === itensDetalhados.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(itensDetalhados.map(p => p.id)));
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="animate-spin h-12 w-12" /></div>;
    }

    if (itensDetalhados.length === 0) {
        return <div className="text-center text-xl mt-10">Seu carrinho está vazio.</div>;
    }

    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Carrinho</h1> 
                <Button disabled={selected.size === 0}>Finalizar Compra ({selected.size})</Button>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Checkbox checked={selected.size > 0 && selected.size === itensDetalhados.length} onCheckedChange={selecionaTodos}/></TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead>Preço Unitário</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Preço Total</TableHead>
                            <TableHead>Excluir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(grouped).map(([fornecedor, itens]) => {
                            const allChecked = itens.every(p => selected.has(p.id));
                            return(
                                <Fragment key={fornecedor}>
                                    <TableRow className="bg-gray-100">
                                        <TableCell><Checkbox checked={allChecked} onCheckedChange={() => selecionaGrupo(fornecedor)}/></TableCell>
                                        <TableCell colSpan={5} className="font-semibold">{fornecedor}</TableCell>
                                    </TableRow>
                                    {itens.map((produto) => (
                                        <TableRow key={produto.id}>
                                            <TableCell><Checkbox checked={selected.has(produto.id)} onCheckedChange={() => selecionaUm(produto.id)}/></TableCell>
                                            <TableCell className="flex flex-row gap-3 items-center">
                                                <Image src={produto.imagemUrl} alt={produto.nome} height={100} width={100} className="rounded-md" /> 
                                                <div className="flex flex-col gap-1">
                                                    <Label className="font-semibold">{produto.nome}</Label>    
                                                    <Label className="text-sm text-gray-400">Categoria: {produto.categoriaId}</Label>    
                                                </div>  
                                            </TableCell>
                                            <TableCell>R$ {produto.precoUnitario.toFixed(2)}</TableCell>
                                            <TableCell>{produto.quantidade}</TableCell>
                                            <TableCell>R$ {(produto.precoUnitario * produto.quantidade).toFixed(2)}</TableCell>
                                            <TableCell><Button variant="ghost" size={"icon"}><Trash2 className="hover:text-red-500 transition-colors"/></Button></TableCell>
                                        </TableRow>
                                    ))}
                                </Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-row justify-end items-center gap-4 text-2xl font-semibold">
                <Label>Preço Total dos Itens Selecionados:</Label>
                <Label className="text-green-700">R$ {precoTotal.toFixed(2)}</Label>
            </div>
        </div>
    );
}