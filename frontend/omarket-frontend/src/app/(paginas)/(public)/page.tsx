'use client';

import CategoriaCard from "@/components/cards/CategoriaCard";

//import { AuthContext } from "@/context/AuthContext";
//import { useContext } from "react";

export default function Home() {

    //const { token } = useContext(AuthContext);

    return (
        <div className="">
            
            <div className="flex flex-col gap-7">
                <h1 className="text-3xl font-bold">Categoria</h1>
                <CategoriaCard/>
            </div>

        </div>
    );
}