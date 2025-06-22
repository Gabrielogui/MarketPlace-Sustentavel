import Image from "next/image";

export default function CategoriaCard () {
    return(
        <div className="hover:cursor-pointer hover:border-2 hover:border-gray-400 rounded-md transition-all">
            {/* IMAGEM */}
            <div>
                <Image src={"https://picsum.photos/320/250"} alt="Categoria" height={250} width={320} 
                    className="rounded-md">
                </Image>
            </div>
            {/* NOME DA CATEGORIA */}
            <div>
                <h2 className="text-2xl font-semibold text-green-800">Nome da Categoria</h2>
            </div>
        </div>
    );
}