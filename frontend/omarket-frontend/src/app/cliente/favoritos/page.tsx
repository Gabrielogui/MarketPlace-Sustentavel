'use client'

import ProdutoCard from "@/components/cards/ProdutoCard";
import Navigation from "@/components/Navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import { Favorito, Produto } from "@/core";
import { getListaFavoritos } from "@/service/favorito/favoritoService";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Favoritos () {

    // |=======| ROUTER |=======|
    const { user } = useContext(AuthContext);

    // |=======| USESTATES DE FAVORITOS + PRODUTO |=======|
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    // |=======| USEEFFECT COM FECTH DOS FAVORITOS |=======|
    useEffect(() => {
        async function fetchFavoritos () {

            if(!user) return;

            try{
                const response = await getListaFavoritos(user.id);
                setFavoritos(response.data);
            } catch(error: any) {
                toast.error(error.response?.data?.message || "Não foi possível carregar os produtos favoritados!");
            }
        }

        fetchFavoritos();
    })

    return(
        <div>
            {/* TÍTULO */}
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Favoritos</h1>
                <div className="flex flex-col items-center">
                    <p>Classificar por preço</p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Crescente">Crescente</SelectItem>
                                <SelectItem value="Decrescente">Decrescente</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* PRODUTOS FAVORITOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 pt-10 justify-items-center gap-7">
                {favoritos.map((favorito) => (
                    <ProdutoCard key={favorito.id} produto={favorito.produtoDTO}/>
                ))}
            </div>
            <div>
                <Navigation currentPage={1} totalPages={5}/>
            </div>
        </div>
    );
}