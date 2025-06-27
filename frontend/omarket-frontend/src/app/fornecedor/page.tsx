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
            <div>
                <Label className="text-4xl">Meus produtos principais</Label>
                {/* PRODUTOS */}
                <div>

                </div>
            </div>
        </div>
    )
}