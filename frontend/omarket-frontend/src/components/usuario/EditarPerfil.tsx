import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Edit, Home, Key, LocateFixed, Mail, Map, MapPin, Phone, User, UserPen, X, Loader2 } from "lucide-react";
import { Cliente, Fornecedor } from "@/core";
import { UserProfile, useUserProfile } from "@/hooks/useUserProfile";

// Interface para os dados do formulário
export interface PerfilFormData {
    nome: string;
    email: string;
    telefone: string;
    senha?: string;
}

export interface EditarPerfilProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: PerfilFormData) => void;
    profile: UserProfile | null; // Recebe o perfil diretamente para evitar chamadas duplicadas
    isSaving: boolean;
}

export default function EditarPerfil({ isOpen, onOpenChange, onSave, profile, isSaving }: EditarPerfilProps) {
    const [formData, setFormData] = useState<PerfilFormData>({ nome: '', email: '', telefone: '' });

    useEffect(() => {
        if (profile && isOpen) {
            setFormData({
                nome: profile.nome,
                email: profile.email,
                telefone: profile.telefone,
                senha: '', // Sempre começa em branco
            });
        }
    }, [profile, isOpen]);

    const handleChange = (field: keyof PerfilFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                         <DrawerTitle className="text-2xl flex items-center gap-2"><UserPen className="text-primary" /> Editar Perfil</DrawerTitle>
                         <DrawerDescription>Atualize suas informações pessoais</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 overflow-y-auto">
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg mb-4">Informações Pessoais</h3>
                            <div className="grid grid-cols-1 gap-4">
                               <div className="flex flex-col gap-1.5"><Label>Nome</Label><Input value={formData.nome} onChange={handleChange('nome')} /></div>
                               <div className="flex flex-col gap-1.5"><Label>E-mail</Label><Input value={formData.email} onChange={handleChange('email')} type="email" /></div>
                               <div className="flex flex-col gap-1.5"><Label>Telefone</Label><Input value={formData.telefone} onChange={handleChange('telefone')} /></div>
                            </div>
                        </div>
                        <div className="mb-5">
                           <h3 className="font-semibold text-lg mb-4">Alterar Senha</h3>
                           <div className="flex flex-col gap-1.5"><Label>Nova senha</Label><Input value={formData.senha} onChange={handleChange('senha')} type="password" placeholder="Deixe em branco para não alterar"/></div>
                        </div>
                        <div className="mt-8">
                            <Button onClick={() => onSave(formData)} disabled={isSaving} className="w-full bg-green-600 hover:bg-green-700">
                                {isSaving ? <Loader2 className="animate-spin" /> : 'Salvar Alterações'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}