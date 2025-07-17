'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { atualizarQuantidadeItemCarrinho, getMeuCarrinho, removerItemCarrinho } from "@/service/carrinho/carrinhoService";
import { toast } from "sonner";
import { getProduto } from "@/service/produto/produtoService";
import { criarPedido } from "@/service/pedido/pedidoService";
import { useRouter } from "next/navigation";

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
    const [removendoId, setRemovendoId] = useState<number | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const [finalizando, setFinalizando] = useState(false);
    const router = useRouter();

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
    
    const handleFinalizarCompra = async () => {
        const selecionados = itensDetalhados.filter(item => selected.has(item.id));
        
        // Verifica se todos os itens selecionados são do mesmo fornecedor
        const fornecedores = new Set(selecionados.map(item => item.fornecedor));
        if (fornecedores.size > 1) {
            toast.error("Só é possível finalizar a compra com produtos do mesmo fornecedor.");
            return;
        }

        const payload = selecionados.map(item => ({
            produtoId: item.id,
            quantidade: item.quantidade
        }));

        try {
            setFinalizando(true);
            const { data } = await criarPedido(payload);
            toast.success(`Pedido #${data.id} criado com sucesso!`);
            router.push(`/cliente/pagamento/${data.id}`);

            // Remove os itens criados do carrinho
            setItensDetalhados(prev =>
                prev.filter(item => !selected.has(item.id))
            );
            setSelected(new Set());
            

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Erro ao criar pedido:", err);
            toast.error(err.response?.data?.message || "Erro ao criar pedido.");
        } finally {
            setFinalizando(false);
        }
    };

    const handleRemoverItem = async (produtoId: number) => {
        if (removendoId !== null) return; // evita duplo clique
        try {
            setRemovendoId(produtoId);
            await removerItemCarrinho(produtoId);
            toast.success("Item removido do carrinho!");
            // Filtra o array para retirar o item removido
            setItensDetalhados(prev =>
                prev.filter(item => item.id !== produtoId)
            );
            // Também atualiza seleção, caso estivesse marcado
            setSelected(prev => {
                const next = new Set(prev);
                next.delete(produtoId);
                return next;
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Erro ao remover item:", err);
            toast.error(err.response?.data?.message || "Falha ao remover o item.");
        } finally {
            setRemovendoId(null);
        }
    };

    const handleAtualizarQuantidade = async (produtoId: number, delta: number) => {
        const item = itensDetalhados.find(i => i.id === produtoId);
        if (!item) return;
        const novaQtd = item.quantidade + delta;
        if (novaQtd < 0) return;
        try {
            setUpdatingId(produtoId);
            
            await atualizarQuantidadeItemCarrinho(produtoId, novaQtd);
            
            setItensDetalhados(prev =>
                prev
                .map(i => i.id === produtoId ? { ...i, quantidade: novaQtd } : i)
                // se zerou, remove do array
                .filter(i => i.quantidade > 0)
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Erro ao atualizar quantidade:", err);
            toast.error(err.response?.data?.message || "Falha ao atualizar quantidade.");
        } finally {
            setUpdatingId(null);
        }
    };

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
                <Button disabled={selected.size === 0 || finalizando} onClick={handleFinalizarCompra}>
                    { finalizando ? (
                        <LoaderCircle className="animate-spin h-5 w-5" />
                    ) : (
                        `Finalizar Compra (${selected.size})`
                    )}
                </Button>
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
                                            <TableCell>
                                                <Button size={"icon"} variant={"ghost"}
                                                    onClick={() => handleAtualizarQuantidade(produto.id, -1)}
                                                    disabled={updatingId === produto.id}
                                                    > {updatingId === produto.id
                                                        ? <LoaderCircle className="animate-spin h-5 w-5" />
                                                        : <Minus />}
                                                </Button>
                                                {produto.quantidade}
                                                <Button size={"icon"} variant={"ghost"}
                                                    onClick={() => handleAtualizarQuantidade(produto.id, +1)}
                                                    disabled={updatingId === produto.id}
                                                    > {updatingId === produto.id 
                                                        ? <LoaderCircle className="animate-spin h-5 w-5" />
                                                        : <Plus /> 
                                                    }
                                                </Button>
                                            </TableCell>
                                            <TableCell>R$ {(produto.precoUnitario * produto.quantidade).toFixed(2)}</TableCell>
                                            <TableCell><Button variant="ghost" size={"icon"}
                                                onClick={() => handleRemoverItem(produto.id)}
                                                disabled={removendoId === produto.id}>
                                                {removendoId === produto.id
                                                ? <LoaderCircle className="animate-spin h-5 w-5"/>
                                                : <Trash2 className="hover:text-red-500 transition-colors"/>}
                                            </Button></TableCell>
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