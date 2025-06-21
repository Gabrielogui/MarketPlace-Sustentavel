import Image from "next/image";

export default function CategoriaCard () {
    return(
        <div>
            {/* IMAGEM */}
            <div>
                <Image src={"https://picsum.photos/300/300"} alt="Categoria" height={300} width={300}></Image>
            </div>
            {/* NOME DA CATEGORIA */}
            <div>
                <h2>Fruta</h2>
            </div>
        </div>
    );
}