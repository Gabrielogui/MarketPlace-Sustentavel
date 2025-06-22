import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function Produto () {
    return(
        <div>
            <div className="flex flex-row gap-16">
                <div>
                    <Image src={"https://picsum.photos/1500/1500"} alt="Produto" height={1500} width={1500} 
                        className="rounded-md">
                    </Image>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <h1 className="text-3xl font-bold">Nome do Produto</h1>
                    <p className="text-2xl text-gray-500 font-semibold">Fornecedor</p>
                    <p className="text-2xl text-gray-500 font-semibold">Categoria</p>
                    <p className="text-2xl text-gray-500 font-semibold">Avaliação</p>
                    <p className="text-2xl text-gray-500 font-semibold">Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos architecto dolorum sequi quia soluta quod accusantium doloremque repellat animi repellendus odio temporibus repudiandae, consequuntur itaque recusandae unde porro odit?</p>
                    <div className="flex flex-row justify-between">
                        <p className="text-2xl">$10.99</p>
                        <Heart/>
                    </div>
                    <Button>Adicionar ao Carrinho</Button>
                </div>
            </div>
        </div>
    );
}