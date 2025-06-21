'use client';

import CategoriaCard from "@/components/cards/CategoriaCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

//import { AuthContext } from "@/context/AuthContext";
//import { useContext } from "react";

export default function Home() {

    //const { token } = useContext(AuthContext);

    return (
        <div className="">
            
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
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>

        </div>
    );
}