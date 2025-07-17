'use client'

import ProdutoCard from "@/components/cards/ProdutoCard";
import Navigation from "@/components/Navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Produto } from "@/core";
import { buscaProduto, filtrarProduto } from "@/service/produto/produtoService";
import { SliderThumb } from "@radix-ui/react-slider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Busca () {
    const params = useSearchParams();
    const nome = params.get("nome") || "";
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    // |=======| ESTADOS PARA O FILTRO DOS PRODUTOS |=======|
    const [precoRange, setPrecoRange] = useState<[number, number]>([0, 1000]);
    const [notaMin, setNotaMin] = useState<number | null>(null);
    const [ordem, setOrdem] = useState<"asc" | "desc">("asc");

    // |=======| MÉTODO QUE APLICA FILTRO |=======|
    async function aplicarFiltros() {
        setLoading(true);
        try {
            const response = await filtrarProduto({
                precoMin: precoRange[0],
                precoMax: precoRange[1],
                notaMin: notaMin ?? undefined,
                order: ordem || undefined
            });
            setProdutos(response.data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Erro ao aplicar filtros.");
        } finally {
            setLoading(false);
        }
    }

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
                        <p>R${precoRange[0]}-{precoRange[1]}</p> {/* DECIDIR QUAL VAI SER A FAIXA DE PREÇO */}
                    </div>
                    <Slider
                        defaultValue={[0, 500]}
                        max={1000}
                        step={1}
                        onValueChange={(value) => setPrecoRange([value[0], value[1]])}
                    >
                        <SliderThumb/>
                        <SliderThumb/>
                    </Slider>
                </div>
                <div className="flex flex-col gap-1 w-full max-w-sm">
                    <p>Avaliação mínima</p>
                    <Select onValueChange={(value) => setNotaMin(parseInt(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar nota mínima" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Array.from({length: 10}).map((_, i) => (
                                    <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col items-center">
                    <p>Classificar por preço</p>
                    <Select onValueChange={(value) => setOrdem(value as "asc" | "desc")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="asc">Crescente</SelectItem>
                                <SelectItem value="desc">Decrescente</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={aplicarFiltros}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Aplicar Filtros
                    </button>
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