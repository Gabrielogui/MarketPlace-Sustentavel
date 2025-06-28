import ProdutoFornecedorCard from "@/components/cards/ProdutoFornecedorCard";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MeusProdutos () {
    return(
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <Label className="text-3xl">Meus Produtos</Label>
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
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
                <ProdutoFornecedorCard/>
            </div>
        </div>
    );
}