import Image from "next/image";

export default function ProdutoRalacionadoCard () {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <Image src={"https://picsum.photos/150/150"} alt="Produto" height={150} width={150} 
                    className="rounded-md">
                </Image>
            </div>
            <div className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">Nome do Produto</h4>
                <p className="text-gray-500 text-sm font-semibold">Descrição curta do produto</p>
                <p className="text-gray-500 text-sm font-semibold">$10.99</p>
            </div>
        </div>
    );
}