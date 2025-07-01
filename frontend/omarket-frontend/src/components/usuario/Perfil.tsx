import { BadgeCheck, Calendar, ChevronRight, Edit, Home, Key, LogOut, Mail, MapPin, Phone, User, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export interface PerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Perfil ( {isOpen, onOpenChange}: PerfilProps ) {

    const UsuarioMock = {
        nome: "Gabriel Rodrigues",
        email: "email@exemplo.com",
        telefone: "(99) 99999-9999",
        tipoUsuario: "Cliente",
        cpf: "123.456.789-00",
        dataNascimento: "15/03/1985",
        endereco: {
            numero: "123",
            complemento: "Avenida Silveira Martins",
            cep: "12345-123"
        }
  };

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-md">
                    {/* |=======| HEADER |=======| */}
                    <DrawerHeader className="flex flex-row justify-between items-start border-b">
                        <div>
                            <DrawerTitle className="text-2xl flex flex-row items-center gap-2">
                                <User className="text-primary" size={28} />
                                Perfil do Usuário
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
                    
                    <div className="p-4 pb-0 overflow-y-auto max-h-[calc(100vh-100px)]">
                        {/* |=======| SEÇÃO DAS INFORMAÇÕS PESSOAIS |=======| */}
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User size={20} className="text-primary" />
                                Informações Pessoais
                                <Button variant="ghost" size="icon" className="ml-auto">
                                <Edit size={16} />
                                </Button>
                            </h3>
                            
                            <div className="grid grid-cols-2 space-y-3 ml-2">
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <User size={16} className="text-xs"/>
                                        <h4 className="text-sm">Nome do Usuário</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.nome}</Label>
                                </div>
                                <div>
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <Mail size={16} className="text-xs"/>
                                        <h4 className="text-sm">Email do Usuário</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.email}</Label>
                                </div>
                                <div>
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <Phone size={16} className="text-xs"/>
                                        <h4 className="text-sm">Telefone</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.telefone}</Label>
                                </div>
                                <div>
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <BadgeCheck size={16} className="text-xs"/>
                                        <h4 className="text-sm">Tipo de usuário</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.tipoUsuario}</Label>
                                </div>
                            </div>
                        </div>

                        {/* |=======| SEÇÃO DE DOCUMENTOS |=======| */}
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Key size={20} className="text-primary" />
                                Documentos
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4 ml-2">
                                <div>
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <Key size={16} className="text-xs"/>
                                        <h4 className="text-sm">CPF</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.cpf}</Label>
                                </div>
                                <div>
                                    <div className="flex flex-row gap-1 text-gray-500 items-center">
                                        <Calendar size={16} className="text-xs"/>
                                        <h4 className="text-sm">Data de Nascimento</h4>
                                    </div>
                                    <Label className="text-md">{UsuarioMock.dataNascimento}</Label>
                                </div>
                            </div>
                        </div>

                        {/* |=======| SEÇÃO DE ENDEREÇO |=======| */}
                        <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Home size={20} className="text-primary" />
                                Endereço Cadastrado
                            </h3>
                            <Button variant="ghost" className="flex items-center gap-1">
                                <Edit size={14} />
                                Alterar
                            </Button>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border ml-2">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <Label>CEP: {UsuarioMock.endereco.cep}</Label>
                                    <Label>Nº: {UsuarioMock.endereco.numero}</Label>
                                    <Label>{UsuarioMock.endereco.complemento}</Label>
                                </div>
                            </div>
                        </div>
                        </div>

                        {/* |=======| BOTÕES DE AÇÃO |=======| */} {/* PODE SER QUE VIRE TABS */}
                        <div className="flex flex-col gap-3 mt-6">
                            <Button variant="outline" className="flex justify-between">
                                <span>Visualizar Avaliações</span>
                                <ChevronRight size={18} />
                            </Button>
                            <Button variant="outline" className="flex justify-between">
                                <span>Histórico de pedidos</span>
                                <ChevronRight size={18} />
                            </Button>
                            <Button variant="destructive" className="mt-4">
                                <LogOut />
                                Sair da conta
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}