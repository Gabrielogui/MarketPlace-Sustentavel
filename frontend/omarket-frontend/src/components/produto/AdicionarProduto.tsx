import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

export interface AdicionarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AdicionarProduto ({isOpen, onOpenChange}:AdicionarProdutoProps) {

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Adicionar Produto</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}