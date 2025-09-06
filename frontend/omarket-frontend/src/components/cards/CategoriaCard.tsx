import { Categoria } from "@/core";
import Image from "next/image";

interface CategoriaCardProps {
    categoria: Categoria;
}

export default function CategoriaCard ({ categoria }: CategoriaCardProps) {
    return(
        <div className="hover:cursor-pointer hover:shadow-md rounded-md transition-all">
            {/* IMAGEM */}
            <div>
                <Image src={categoria.imagemUrl || "https://picsum.photos/320/250"} alt="Categoria" height={250} width={320} 
                    className="rounded-md">
                </Image>
            </div>
            {/* NOME DA CATEGORIA */}
            <div>
                <h2 className="text-2xl font-semibold text-green-800">{categoria.nome}</h2>
            </div>
        </div>
    );
}