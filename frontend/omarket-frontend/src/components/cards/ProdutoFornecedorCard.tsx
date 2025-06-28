import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PencilLine, Trash2 } from "lucide-react";

export default function ProdutoFornecedorCard () {
    return(
        <div className="flex flex-row gap-2">
            <Image src={"https://picsum.photos/150/150"} alt="Produto" height={150} width={150}></Image>
            <div className="flex flex-col justify-between">
                <Label className="text-2xl">Nome Produto</Label>
                <Label className="text-gray-500">Categoria</Label>
                <Label className="text-gray-500">Preço</Label>
                <div className="flex flex-row justify-start gap-4">
                    <Button variant={"outline"} size={"icon"}>
                        <Trash2/>
                    </Button>
                    <Button variant={"outline"} size={"icon"}>
                        <PencilLine/>
                    </Button>
                </div>
            </div>
        </div>
    );
}