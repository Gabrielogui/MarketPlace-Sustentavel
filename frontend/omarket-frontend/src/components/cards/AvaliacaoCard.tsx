import { Star } from "lucide-react";

export default function AvaliacaoCard () {
    return(
        <div className="flex flex-col gap-3 border-2 border-gray-400 rounded-md p-3 w-full">
            <div className="flex flex-row gap-0.5">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg">Título</h3>
                <p className="text-gray-500">Texto</p>
            </div>
            <div className="flex flex-col">
                <p className="text-gray-500">Nome do Cliente</p>
                <p className="text-gray-500">XX/XX/XXXX</p>
            </div>
        </div>
    );
}