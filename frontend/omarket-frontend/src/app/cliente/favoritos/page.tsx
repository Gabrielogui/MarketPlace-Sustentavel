import ProdutoCard from "@/components/cards/ProdutoCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Favoritos () {
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
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
                <ProdutoCard/>
            </div>
        </div>
    );
}