import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function Produto () {
    return(
        <div>
            <div className="flex flex-row gap-16">
                <div>
                    <Carousel 
                        opts={{
                            align: "center"
                        }}
                        className=""
                    >
                        <CarouselContent>
                            {Array.from( {length:5} ).map((_, index) => (
                                <CarouselItem key={index} className="justify-items-center ">
                                    <Image src={"https://picsum.photos/500/500"} alt="Produto" height={500} width={500} 
                                        className="rounded-md">
                                    </Image>
                                </CarouselItem>
                            )

                            )}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <h1 className="text-3xl font-bold">Nome do Produto</h1>
                    <p className="text-2xl text-gray-500 font-semibold">Fornecedor</p>
                    <p className="text-2xl text-gray-500 font-semibold">Categoria</p>
                    <p className="text-2xl text-gray-500 font-semibold">Avaliação</p>
                    <p className="text-2xl text-gray-500 font-semibold">Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos architecto dolorum sequi quia soluta quod accusantium doloremque repellat animi repellendus odio temporibus repudiandae, consequuntur itaque recusandae unde porro odit? </p>
                    <div className="flex flex-row justify-between">
                        <p className="text-2xl">$10.99</p>
                        <Heart/>
                    </div>
                    <Button>Adicionar ao Carrinho</Button>
                </div>
            </div>
            {/* PRODUTOS RELACIONADOS */}
            <div>

            </div>
        </div>
    );
}