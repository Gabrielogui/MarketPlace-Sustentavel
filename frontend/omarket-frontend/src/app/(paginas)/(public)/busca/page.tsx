'use client'

import ProdutoCard from "@/components/cards/ProdutoCard";
import Navigation from "@/components/Navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Produto } from "@/core";
import { buscaProduto } from "@/service/produto/produtoService";
import { SliderThumb } from "@radix-ui/react-slider";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Busca () {
    const params = useSearchParams();
    const nome = params.get("nome") || "";
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!nome) {
            setProdutos([]);
            setLoading(false);
            return;
        }

            async function fetchProduto() {
                setLoading(true);
                try {
                    const response = await buscaProduto(nome);
                    setProdutos(response.data);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                    console.error("Erro na busca:", err);
                    toast.error(err.response?.data?.message || "Falha na busca de produtos.");
                } finally {
                    setLoading(false);
                }
            }

        fetchProduto();
        
    }, [nome]);

    return(
        <div>
            {/* FILTROS */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between">
                        <p>Faixa de Preço</p>
                        <p>R$0-100</p> {/* DECIDIR QUAL VAI SER A FAIXA DE PREÇO */}
                    </div>
                    <Slider
                        defaultValue={[0, 50]}
                        max={100}
                        step={1}
                    >
                        <SliderThumb/>
                        <SliderThumb/>
                    </Slider>
                </div>
                <div className="flex flex-col items-center">
                    <p>Avaliacao média do produto</p>
                    <div className="flex flex-row gap-2"><Star/> <Star/> <Star/> <Star/> <Star/></div>
                </div>
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
            {/* PRODUTOS */}
            {loading ? (
                <p>Carregando a busca...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-10 justify-items-center gap-7">
                        {produtos.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto}/>
                        ))}
                    </div>  
                )}
                
            <div>
                <Navigation currentPage={1} totalPages={5}/>
            </div>
        </div>
    );
}