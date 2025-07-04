import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

export interface EnderecoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Endereco ({ isOpen, onOpenChange } : EnderecoProps) {
    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Endereço</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}