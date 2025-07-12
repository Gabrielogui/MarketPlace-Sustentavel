import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { Produto } from "@/core/produto";

interface ProdutoCardProps {
    produto: Produto;
}

export default function ProdutoCard ({ produto }: ProdutoCardProps) {
    return(
        <div className="flex flex-row gap-2 hover:cursor-pointer hover:scale-105 hover:shadow-md transition-all p-4 border rounded-lg w-full max-w-sm">
            <div>
                {/* A imagem continua sendo do picsum por enquanto */}
                <Image src={"https://picsum.photos/150/150"} alt={produto.nome} height={150} width={150} className="rounded-md"></Image>
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold truncate">{produto.nome}</h3>
                    {/* Exibindo o ID da categoria como placeholder */}
                    <p className="text-gray-500 font-semibold">Categoria</p>
                    <p className="text-lg font-bold text-green-700">R$ {produto.preco.toFixed(2)}</p>
                </div>
                <div className="flex flex-row gap-2 items-center mt-2">
                    <Button className="cursor-pointer flex-grow">Adicionar ao Carrinho</Button>
                    <Heart size={35} className="hover:text-red-500 hover:scale-110 transition-all duration-500 cursor-pointer"/>
                </div>
            </div>
        </div>
    );
}