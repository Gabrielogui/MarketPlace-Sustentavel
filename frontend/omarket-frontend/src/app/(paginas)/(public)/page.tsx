'use client';

import CategoriaCard from "@/components/cards/CategoriaCard";
import ProdutoCard from "@/components/cards/ProdutoCard";
import Navegation from "@/components/Navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

//import { AuthContext } from "@/context/AuthContext";
//import { useContext } from "react";

export default function Home() {

    //const { token } = useContext(AuthContext);

    return (
        <div className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-7">
                <h1 className="text-3xl font-bold">Categoria</h1>
                <Carousel 
                    opts={{
                        align: "center"
                    }}
                    className=""
                >
                    <CarouselContent>
                        {Array.from( {length:5} ).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 justify-items-center ">
                                <CategoriaCard/>
                            </CarouselItem>
                        )

                        )}
                    </CarouselContent>
                    <CarouselPrevious className="cursor-pointer"/>
                    <CarouselNext className="cursor-pointer"/>
                </Carousel>
            </div>

            <div className="flex flex-col gap-7">
                <h1 className="text-3xl font-bold">Produtos</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                    <ProdutoCard/>
                </div>
            </div>
            
            <div className="mt-8">
                <Navegation currentPage={1} totalPages={5}/>
            </div>

        </div>
    );
}