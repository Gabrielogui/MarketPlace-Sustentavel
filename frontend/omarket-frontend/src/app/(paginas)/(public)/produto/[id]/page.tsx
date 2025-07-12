'use client'

import AvaliacaoCard from "@/components/cards/AvaliacaoCard";
import ProdutoRelacionadoCard from "@/components/cards/ProdutoRelacionadoCard";
import AvaliarProduto from "@/components/produto/AvaliarProduto";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Produto } from "@/core/produto";
import { adicionarItemAoCarrinho } from "@/service/carrinho/carrinhoService";
import { getProduto } from "@/service/produto/produtoService";
import { Heart, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProdutoDetalhe() {
    const [isDialogAvaliarProdutoOpen, setIsDialogAvaliarProdutoOpen] = useState(false);
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = Number(params.id);

    
    useEffect(() => {
        if (!id) return;
        
        async function fetchProduto() {
            try {
                console.log("id do produto: ", id)
                const response = await getProduto(id);
                setProduto(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Erro ao buscar produto:", error);
                toast.error(error.response?.data?.message || "Não foi possível carregar o produto.");
            } finally {
                setLoading(false);
            }
        }

        fetchProduto();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoaderCircle className="animate-spin h-12 w-12" />
            </div>
        );
    }

    if (!produto) {
        return <div className="text-center">Produto não encontrado.</div>;
    }

    const handleAdicionarAoCarrinho = async () => {
        try {
            const payload = {
                produtoId: produto.id,
                quantidade: 1
            };
            await adicionarItemAoCarrinho(payload);
            toast.success(`${produto.nome} foi adicionado ao carrinho!`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao adicionar item:", error);
            toast.error(error.response?.data?.message || "Não foi possível adicionar o produto.");
        }
    };
    return(
        <div className="flex flex-col gap-10 ">
            {/* PRODUTO */}
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">{produto.nome}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div>
                        <Carousel className="w-full max-w-md mx-auto">
                            <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <Image src={"https://picsum.photos/500/500"} alt={produto.nome} height={500} width={500}
                                            className="rounded-md">
                                        </Image>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="cursor-pointer"/>
                            <CarouselNext className="cursor-pointer"/>
                        </Carousel>
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                        <h1 className="text-4xl font-bold">{produto.nome}</h1>
                        <p className="text-xl text-gray-600 font-semibold">Fornecedor ID: </p>
                        <p className="text-xl text-gray-600 font-semibold">Categoria ID: </p>
                        <p className="text-lg text-gray-500">{produto.descricao}</p>
                        <div className="flex flex-row justify-between items-center mt-4">
                            <p className="text-3xl font-extrabold text-green-700">R$ {produto.preco.toFixed(2)}</p>
                            <Heart size={30} className="cursor-pointer hover:scale-110 hover:text-red-500 transition-all duration-500"/>
                        </div> 
                        <Button onClick={handleAdicionarAoCarrinho} className="cursor-pointer mt-4 py-6 text-lg">Adicionar ao Carrinho</Button>
                    </div>
                </div>
            </div>
            {/* PRODUTOS RELACIONADOS */}
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Produtos Relacionados</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                </div>
            </div>
            {/* AVALIAÇÃO */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold">Avaliações</h1>
                    <Button onClick={() => setIsDialogAvaliarProdutoOpen(true)} className="cursor-pointer">
                        Avaliar Produto
                    </Button>
                </div>
                <div>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <AvaliacaoCard/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="cursor-pointer"/>
                        <CarouselNext className="cursor-pointer"/>
                    </Carousel>
                </div>
            </div>
            <AvaliarProduto isOpen={isDialogAvaliarProdutoOpen} onOpenChange={setIsDialogAvaliarProdutoOpen}/>
        </div>
    );
}