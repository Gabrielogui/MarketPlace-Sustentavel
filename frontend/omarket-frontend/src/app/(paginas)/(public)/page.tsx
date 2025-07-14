'use client';

import CategoriaCard from "@/components/cards/CategoriaCard";
import ProdutoCard from "@/components/cards/ProdutoCard";
import Navegation from "@/components/Navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Categoria } from "@/core";
import { Produto } from "@/core/produto";
import { getListaCategoria } from "@/service/categoria/categoria";
import { getListaProduto } from "@/service/produto/produtoService";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await getListaProduto();
                setProdutos(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Erro ao buscar produtos:", error);
                toast.error(error.response?.data?.message || "Não foi possível carregar os produtos.");
            } finally {
                setLoading(false);
            }
        }

        async function fetchCategorias() {
            try {
                const categoriaResponse = await getListaCategoria();
                setCategorias(categoriaResponse.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any){
                console.error("Erro ao buscar categorias:", error);
                toast.error(error.categoriaResponse?.data?.message || "Não foi possível carregar as categorias.");
            } finally {
                setLoading(false);
            }
        }

        fetchCategorias();
        fetchProdutos();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-7">
                <h1 className="text-3xl font-bold">Categorias</h1>
                <Carousel 
                    opts={{
                        align: "center"
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {categorias.map((categoria) => (
                            <CarouselItem key={categoria.id} className="md:basis-1/2 lg:basis-1/3">
                                <CategoriaCard key={categoria.id} categoria={categoria}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="cursor-pointer"/>
                    <CarouselNext className="cursor-pointer"/>
                </Carousel>
            </div>

            <div className="flex flex-col gap-7">
                <h1 className="text-3xl font-bold">Produtos</h1>
                {loading ? (
                    <p>Carregando produtos...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                        {produtos.map((produto) => (
                            <ProdutoCard key={produto.id} produto={produto} />
                        ))}
                    </div>
                )}
            </div>
            
            <div className="mt-8">
                <Navegation currentPage={1} totalPages={5}/>
            </div>

        </div>
    );
}
