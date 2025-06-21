'use client';

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {

    const { token } = useContext(AuthContext);

    return (
        <div className="">
            Conteúdo
            {
                token ? (<div>Você Está logado!</div>)
                : (<div>Você não está logado</div>)
            }

        </div>
    );
}