import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Edit, Home, Key, LocateFixed, Mail, Map, MapPin, Phone, User, UserPen, X } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";
import { EditarPayload } from "@/service/usuario/userService";

export interface EditarPerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: Partial<EditarPayload>) => Promise<void>;
}

export default function EditarPerfil ({isOpen, onOpenChange, onSave}: EditarPerfilProps) {
    const { profile } = useUserProfile();
    const [formData, setFormData] = useState<Partial<EditarPayload>>({});

    // Popula o formulário quando o perfil do usuário é carregado
    useEffect(() => {
        if (profile) {
            setFormData({
                nome: profile.nome,
                email: profile.email,
                telefone: profile.telefone,
            });
        }
    }, [profile]);

    const handleChange = (field: keyof EditarPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSaveChanges = async () => {
        if (!profile) {
            toast.error("Não foi possível carregar os dados do usuário.");
            return;
        }

        // Remove a senha se estiver vazia para não enviar ao backend
        const payload = { ...formData };
        if (!payload.senha) {
            delete payload.senha;
        }
        
        await onSave(payload);
        onOpenChange(false); // Fecha o drawer após salvar
    };

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader className="flex flex-row justify-between items-start border-b">
                        <div>
                            <DrawerTitle className="text-2xl flex flex-row items-center gap-2">
                                <UserPen className="text-primary" size={28} />
                                Editar Perfil
                            </DrawerTitle>
                            <DrawerDescription>Atualize suas informações pessoais</DrawerDescription>
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

                    {/* |=======| CORPO DO DRAWER |=======| */}
                    <div className="p-4 pb-0 overflow-y-auto max-h-[calc(100vh-100px)]">
                        {/* |=======| INFORMAÇÕES PESSOAIS |=======| */}
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <UserPen size={20} className="text-primary" />
                                Informações Pessoais
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="flex items-center gap-1"><User size={16}/> Nome</Label>
                                    <Input value={formData.nome || ''} onChange={handleChange('nome')} placeholder="Seu nome completo"/>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="flex items-center gap-1"><Mail size={16}/> E-mail</Label>
                                    <Input value={formData.email || ''} onChange={handleChange('email')} type="email" placeholder="email@exemplo.com"/>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="flex items-center gap-1"><Phone size={16}/> Telefone</Label>
                                    <Input value={formData.telefone || ''} onChange={handleChange('telefone')} placeholder="(XX) XXXXX-XXXX"/>
                                </div>
                            </div>
                        </div>

                        {/* |=======| ALTERAÇÃO DE SENHA |=======| */}
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Key size={20} className="text-primary" />
                                Alterar Senha
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="flex items-center gap-1"><Key size={16}/> Nova senha</Label>
                                    <Input onChange={handleChange('senha')} type="password" placeholder="Deixe em branco para não alterar"/>
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
                        
                        {/* |=======| BOTÃO PARA SALVAR |=======| */}
                        <div className="mt-8">
                            <Button onClick={handleSaveChanges} variant="outline" className="flex justify-between w-full bg-green-600 hover:bg-green-700 text-white hover:text-white cursor-pointer">
                                <span>Salvar Alterações</span>
                                <Edit size={18} />
                            </Button>
                        </div>
                    </div>
                </div>  
            </DrawerContent>
        </Drawer>
    );
}
