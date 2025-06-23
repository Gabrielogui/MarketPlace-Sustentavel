import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ProdutoNoCarrinho {
    id: number;
    nome: string;
    categoria: string;
    precoUnitario: number;
    quantidade: number;
    fornecedor: string;
    imagemUrl: string;
}

export default function Carrinho () {

    const produtosMock: ProdutoNoCarrinho[] = [
        { id: 1, nome: 'Maçã', categoria: 'Frutas', precoUnitario: 3.5, quantidade: 2, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100' },
        { id: 2, nome: 'Pera', categoria: 'Frutas', precoUnitario: 4.2, quantidade: 1, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100' },
        { id: 3, nome: 'Arroz', categoria: 'Grãos', precoUnitario: 5.0, quantidade: 3, fornecedor: 'Fornecedor B', imagemUrl: 'https://picsum.photos/100/100' }, 
    ];

    return(
        <div className="flex flex-col gap-10">
            {/* TÍTULO + BOTÃO DE FAZER A COMPRA */}
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Favoritos</h1> 
                <Button>Finalizar a Compra</Button>
            </div>
            {/* TABELA DO CARRINHO */}
            <div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1">
                        <Checkbox />
                        <Label>Pedidos</Label>
                    </div>
                    <div className="flex flex-row gap-10">
                        <Label>Preço Unitário</Label>
                        <Label>Quantidade</Label>
                        <Label>Preço Total</Label>
                        <Label>Excluir</Label>
                    </div>
                </div>
            </div>
        </div>
    );
}