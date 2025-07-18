import { Avaliacao } from "@/core";
import { Star } from "lucide-react";

interface AvaliacaoCardProps {
    avaliacao: Avaliacao;
}

export default function AvaliacaoCard ({ avaliacao }: AvaliacaoCardProps) {
    
    // |=======| FORMATAR DATA xx/xx/xxxx |=======|
    const formatarData = (dataString: string) => {
        const data = new Date(dataString);
        return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
    }
    
    return(
        <div className="flex flex-col gap-3 border-2 border-gray-400 rounded-md p-3 w-full ">
            <div className="flex flex-row gap-0.5">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                {avaliacao.nota}
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg">Título</h3>
                <p className="text-gray-500">{avaliacao.comentario}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-gray-500">Id do Cliente: {avaliacao.clienteId}</p>
                <p className="text-gray-500">{formatarData(avaliacao.dataModificacao)}</p>
            </div>
        </div>
    );
}