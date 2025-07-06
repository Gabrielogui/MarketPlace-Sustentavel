import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

export interface EditarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditarProduto ({isOpen, onOpenChange}:EditarProdutoProps) {
    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <div className="mx-auto w-full h-full flex flex-col">
                    <DrawerHeader>
                        <DrawerTitle>Editar Produto</DrawerTitle>
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>
    );
}