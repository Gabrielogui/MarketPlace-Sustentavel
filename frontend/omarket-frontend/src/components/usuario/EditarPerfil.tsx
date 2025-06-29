import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export interface EditarPerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditarPerfil ({isOpen, onOpenChange}:EditarPerfilProps) {
    return(
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar Perfil</SheetTitle>    
                </SheetHeader>    
            </SheetContent>    
        </Sheet>
    );
}