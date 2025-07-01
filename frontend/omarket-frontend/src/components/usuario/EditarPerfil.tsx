import { Edit, FileLock, Home, Key, LocateFixed, Mail, Map, MapPin, Phone, User, UserPen, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export interface EditarPerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditarPerfil ({isOpen, onOpenChange}:EditarPerfilProps) {
    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
                <DrawerContent className="h-screen">
                    <div className="mx-auto w-full max-w-md">
                        <DrawerHeader className="flex flex-row justify-between items-start border-b">
                            <div>
                                <DrawerTitle className="text-2xl flex flex-row items-center gap-2">
                                    <UserPen className="text-primary" size={28} />
                                    Editar o Perfil
                                </DrawerTitle>
                                <DrawerDescription>Gerencie suas informações pessoais</DrawerDescription>
                            </div>
                            <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => onOpenChange(false)}
                                className="mt-1"
                            >
                                <X size={20} />
                            </Button>
                        </DrawerHeader>

                        {/* |=======| BODY DO DRAWER DE EDITAR PERFIL |=======| */}
                        <div className="p-4 pb-0 overflow-y-auto max-h-[calc(100vh-100px)]">
                            {/* |=======| EDITAR INFORMAÇÕES PESSOAIS |=======| */}
                            <div className="mb-5">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <UserPen size={20} className="text-primary" />
                                    Informações Pessoais
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <User size={16}/>
                                            <Label>Nome do Usuário</Label>
                                        </div>
                                        <Input placeholder="Novo nome"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Mail size={16}/>
                                            <Label>E-mail</Label>
                                        </div>
                                        <Input type="email" placeholder="email@exemplo.com"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Phone size={16}/>
                                            <Label>Telefone</Label>
                                        </div>
                                        <Input placeholder="(XX) X XXXX-XXXX"/>
                                    </div>
                                </div>
                            </div>

                            {/* |=======| EDITAR SENHA |=======| */}
                            <div className="mb-5">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <FileLock size={20} className="text-primary" />
                                    Senhas
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Key size={16}/>
                                            <Label>Nova senha</Label>
                                        </div>
                                        <Input type="password" placeholder="Insira nova senha"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Key size={16}/>
                                            <Label>Repita a nova senha</Label>
                                        </div>
                                        <Input type="password" placeholder="Repita nova senha"/>
                                    </div>
                                </div>
                            </div>

                            {/* |=======| EDITAR ENDEREÇO |=======| */}
                            <div className="mb-5">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Home size={20} className="text-primary" />
                                    Endereço
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <MapPin size={16}/>
                                            <Label>CEP</Label>
                                        </div>
                                        <Input placeholder="XXXXX-XXX"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <LocateFixed size={16}/>
                                            <Label>Número</Label>
                                        </div>
                                        <Input type="number" placeholder="Insira o número"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Map size={16}/>
                                            <Label>Complemento</Label>
                                        </div>
                                        <Input placeholder="Insira o complemento"/>
                                    </div>
                                </div>
                            </div>

                            {/* |=======| BOTÃO PARA ENVIAR |=======| */}
                            <div className="mt-5">
                                <h3 className="font-semibold text-lg mb-4">Finalizar personalização</h3>
                                <Button variant="outline" className="flex justify-between w-full bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer">
                                    <span>Editar</span>
                                    <Edit size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>  
                </DrawerContent>
        </Drawer>
    );
}