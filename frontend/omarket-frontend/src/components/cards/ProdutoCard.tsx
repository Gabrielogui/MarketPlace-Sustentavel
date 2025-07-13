import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Produto } from "@/core/produto";
import Link from "next/link";
import { toast } from "sonner";
import { adicionarItemAoCarrinho } from "@/service/carrinho/carrinhoService"; // Verifique se o caminho está correto

interface ProdutoCardProps {
    produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {

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

    const handleFavoritar = () => {
        toast.info(`Produto ${produto.nome} adicionado aos favoritos! (funcionalidade a ser implementada)`);
    };

    return (
        // O container principal não é mais um Link.
        <div className="flex flex-col justify-between hover:shadow-md transition-shadow p-4 border rounded-lg w-full max-w-sm group">
            
            {/* Apenas a parte superior (imagem e textos) é um link para a página de detalhes */}
            <Link href={`/produto/${produto.id}`} className="flex-grow">
                <div className="flex flex-row gap-4">
                    <Image 
                        src={"https://picsum.photos/150/150"} 
                        alt={produto.nome} 
                        height={150} 
                        width={150} 
                        className="rounded-md transition-transform group-hover:scale-105"
                    />
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-xl font-semibold truncate">{produto.nome}</h3>
                        <p className="text-gray-500 font-semibold">Categoria: {"Categoria"}</p>
                        <p className="text-lg font-bold text-green-700">R$ {produto.preco.toFixed(2)}</p>
                    </div>
                </div>
            </Link>

            {/* A seção de botões fica separada, fora do Link */}
            <div className="flex flex-row gap-2 items-center mt-4 pt-4 border-t">
                <Button onClick={handleAdicionarAoCarrinho} className="cursor-pointer flex-grow items-center gap-2">
                    <ShoppingCart size={16} />
                    Adicionar
                </Button>
                <Button onClick={handleFavoritar} variant="outline" size="icon" aria-label="Favoritar">
                    <Heart
                        size={20}
                        className="text-gray-500 hover:text-red-500 hover:fill-red-500 transition-colors"
                    />
                </Button>
            </div>
        </div>
    );
}
