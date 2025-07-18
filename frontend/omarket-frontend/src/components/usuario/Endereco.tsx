'use client'

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2, MapPin } from "lucide-react";
import { Cliente, Fornecedor } from "@/core";
import { UserProfile } from "@/hooks/useUserProfile";

// Interface para o estado do formulário
export interface EnderecoFormData {
    cep: string;
    numero?: number;
    complemento: string;
}

export interface EnderecoProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: EnderecoFormData) => void;
    profile: UserProfile | null;
    isSaving: boolean;
}

export default function Endereco({ isOpen, onOpenChange, onSave, profile, isSaving }: EnderecoProps) {
    const [formData, setFormData] = useState<EnderecoFormData>({ cep: '', numero: undefined, complemento: '' });

    useEffect(() => {
        if (profile && isOpen && (profile.tipoUsuario === 'CLIENTE' || profile.tipoUsuario === 'FORNECEDOR')) {
            const userWithAddress = profile as Cliente | Fornecedor;
            
            // <<< CORREÇÃO PRINCIPAL AQUI >>>
            // Usando a propriedade correta: enderecoDTO
            setFormData({
                cep: userWithAddress.enderecoDTO?.cep || '',
                numero: userWithAddress.enderecoDTO?.numero,
                complemento: userWithAddress.enderecoDTO?.complemento || ''
            });
        }
    }, [profile, isOpen]);

    const handleChange = (field: keyof EnderecoFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) || undefined : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value as any }));
    };
    
    // O componente não renderiza nada se não for para cliente ou fornecedor
    if (!profile || (profile.tipoUsuario !== 'CLIENTE' && profile.tipoUsuario !== 'FORNECEDOR')) {
        return null; 
    }

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-md flex flex-col h-full">
                    <DrawerHeader>
                         <DrawerTitle className="text-2xl flex items-center gap-2"><MapPin /> Endereço</DrawerTitle>
                         <DrawerDescription>Gerencie seu endereço de entrega</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 flex-1">
                        <div className="flex flex-col gap-4">
                           <div className="flex flex-col gap-2"><Label>CEP</Label><Input value={formData.cep} onChange={handleChange('cep')} placeholder="00000-000" /></div>
                           <div className="flex flex-col gap-2"><Label>Número</Label><Input value={formData.numero || ''} onChange={handleChange('numero')} type="number" placeholder="123" /></div>
                           <div className="flex flex-col gap-2"><Label>Complemento</Label><Input value={formData.complemento} onChange={handleChange('complemento')} placeholder="Apto, casa, etc." /></div>
                        </div>
                    </div>
                    <div className="border-t p-4">
                        <Button onClick={() => onSave(formData)} disabled={isSaving} className="w-full bg-green-600 hover:bg-green-700">
                            {isSaving ? <Loader2 className="animate-spin" /> : 'Salvar Endereço'}
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}