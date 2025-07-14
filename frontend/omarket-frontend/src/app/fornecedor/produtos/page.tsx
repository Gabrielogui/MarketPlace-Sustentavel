'use client'

import ProdutoFornecedorCard from "@/components/cards/ProdutoFornecedorCard";
import Navigation from "@/components/Navigation";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import { Produto } from "@/core";
import { getListaProdutoPorFornecedor } from "@/service/produto/produtoService";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function MeusProdutos () {

    const { user } = useContext(AuthContext);

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProdutosFornecedor() {
            if(!user) return;
            try {
                const response = await getListaProdutoPorFornecedor(user.id);
            
                toast.error("Você precisa se logar como fornecedor")
                
                console.log(response.data);
                setProdutos(response.data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Erro ao buscar produtos:", error);
                toast.error(error.response?.data?.message || "Não foi possível carregar os produtos.");
            } finally {
                setLoading(false);
            }
        }

        fetchProdutosFornecedor();

    }, [user])

    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <Label className="text-3xl">Meus Produtos</Label>
                <div className="flex flex-col items-center">
                    <p>Classificar por preço</p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Crescente">Crescente</SelectItem>
                                <SelectItem value="Decrescente">Decrescente</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
                    {produtos.map((produto) => (
                        <ProdutoFornecedorCard key={produto.id} produto={produto}/>
                    ))}
                </div>    
            )}
            <div>
                <Navigation currentPage={1} totalPages={5}/>
            </div>
        </div>
    );
}