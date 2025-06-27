import ProdutoRelacionadoCard from "@/components/cards/ProdutoRelacionadoCard";
import { Label } from "@/components/ui/label";

export default function FornecedorHome () {
    return(
        <div className="flex flex-col gap-10">
            {/* ESTATÍSTICAS DO FORNECEDOR */}
            <div>
                <Label className="text-4xl">Estatísticas</Label>
                {/* GRÁFICOS */}
                <div>

                </div>
            </div>
            {/* PRINCIPAIS PRODUTOS DO FORNECEDOR */}
            <div className="flex flex-col gap-8">
                <Label className="text-4xl">Meus produtos principais</Label>
                {/* PRODUTOS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                    <ProdutoRelacionadoCard/>
                </div>
            </div>
        </div>
    )
}