import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

export interface InativarPerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function InativarPerfil ({ isOpen, onOpenChange } : InativarPerfilProps) {
    return(
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja Inativar?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Se você inativar, sua conta não poderá ser usada mais para fazer pedidos. 
                        Além disso, seu email não poderá ser usado para criar uma conta nova.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        Inativar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}