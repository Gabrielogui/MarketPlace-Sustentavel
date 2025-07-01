import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

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
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}