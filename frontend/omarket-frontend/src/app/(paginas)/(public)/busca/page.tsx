import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export default function busca () {
    return(
        <div>
            {/* FILTROS */}
            <div className="flex flex-row">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between">
                        <p>Faixa de Preço</p>
                        <p>R$0-100</p> {/* DECIDIR QUAL VAI SER A FAIXA DE PREÇO */}
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p>Avaliacao média do produto</p>
                    <div className="flex flex-row gap-2"><Star/> <Star/> <Star/> <Star/> <Star/></div>
                </div>
                <div>
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
            {/* PRODUTOS */}
            <div>

            </div>
        </div>
    );
}