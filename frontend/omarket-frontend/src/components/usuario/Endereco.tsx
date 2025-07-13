import { ChevronRight, MapPin, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export interface EnderecoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Endereco ({ isOpen, onOpenChange } : EnderecoProps) {

     const [endereco, setEndereco] = useState({
        cep: '12345-678',
        numero: '123',
        complemento: 'Apto 101',
    });

    // Função para atualizar os campos
    const handleChange = (field: string, value: string) => {
        setEndereco(prev => ({ ...prev, [field]: value }));
    };

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader className="flex flex-row justify-between items-start border-b">
                        <div>
                            <DrawerTitle className="text-2xl flex flex-row items-center gap-2">
                                <MapPin />
                                Endereço
                            </DrawerTitle>
                            <DrawerDescription>Gerencie seu endereço</DrawerDescription>
                        </div>
                        <Button size={"icon"} variant={"outline"} onClick={() => onOpenChange(false)}
                            className="mt-1">
                            <X />
                        </Button>
                    </DrawerHeader>

                    {/* CORPO DO ENDEREÇO */}
                    <div className="p-4 pb-0 overflow-y-auto max-h-[calc(100vh-100px)]">
                        {/* INFORMAÇÕES DE ENDEREÇO */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-2xl">Endereço do usuário</Label>
                            <div className="bg-gray-50 rounded-lg p-4 border ml-2 mb-5">
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <Label>CEP: {endereco.cep}</Label>
                                        <Label>Nº: {endereco.numero}</Label>
                                        <Label>{endereco.complemento}</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* INFORMAÇÕES EDITÁVEIS */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Linha 1: CEP */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="cep">CEP</Label>
                                <Input
                                    id="cep"
                                    value={endereco.cep}
                                    onChange={(e) => handleChange('cep', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="numero">Número</Label>
                                <Input
                                    id="numero"
                                    value={endereco.numero}
                                    onChange={(e) => handleChange('numero', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="complemento">Complemento</Label>
                                <Input
                                    id="complemento"
                                    value={endereco.complemento}
                                    onChange={(e) => handleChange('complemento', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RODAPÉ COM BOTÕES */}
                    <div className="border-t p-4 flex flex-col gap-3">
                        <Button 
                            variant="outline" onClick={() => onOpenChange(false)}
                            className="flex justify-between bg-red-500 hover:bg-red-700 text-white hover:text-white cursor-pointer"
                        >
                            Cancelar
                            <ChevronRight size={18} />
                        </Button>
                        <Button 
                            variant={"outline"} onClick={() => onOpenChange(false)}
                            className="flex justify-between bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer"
                        >
                            Salvar Alterações
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}