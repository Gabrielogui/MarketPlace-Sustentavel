import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

export interface PerfilProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Perfil ( {isOpen, onOpenChange}: PerfilProps ) {
    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Perfil</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}