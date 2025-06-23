import ProdutoCard from "@/components/cards/ProdutoCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SliderThumb } from "@radix-ui/react-slider";
import { Star } from "lucide-react";

export default function busca () {
    return(
        <div>
            {/* FILTROS */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between">
                        <p>Faixa de Preço</p>
                        <p>R$0-100</p> {/* DECIDIR QUAL VAI SER A FAIXA DE PREÇO */}
                    </div>
                    <Slider
                        defaultValue={[0, 50]}
                        max={100}
                        step={1}
                    >
                        <SliderThumb/>
                        <SliderThumb/>
                    </Slider>
                </div>
                <div className="flex flex-col items-center">
                    <p>Avaliacao média do produto</p>
                    <div className="flex flex-row gap-2"><Star/> <Star/> <Star/> <Star/> <Star/></div>
                </div>
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
            {/* PRODUTOS */}
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