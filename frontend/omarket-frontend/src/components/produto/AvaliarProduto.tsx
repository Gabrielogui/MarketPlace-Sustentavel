import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

export interface AvaliarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AvaliarProduto ({isOpen, onOpenChange}:AvaliarProdutoProps) {
    return(
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Avalie o Produto</DialogTitle>
                    <DialogDescription>Faça a avaliação o produto com um título, comentário e uma nota</DialogDescription>
                </DialogHeader>

                {/* CORPO DO DIALOG */}
                <div className="grid grid-cols-1 gap-1">
                    <div className="flex flex-row justify-between gap-2 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <Label>Título</Label>
                            <Input className="w-full" placeholder="Insira o título"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Nota</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma nota de 0-10" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(() => {
                                        const itens = []
                                        for(let i = 0 ; i <= 10 ; i++){
                                            itens.push(
                                                <SelectItem key={i} value={i.toString()}>
                                                    {i.toString().padStart(2, '0')}
                                                </SelectItem>
                                            )
                                        }
                                        return itens;
                                    })()}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Comentário</Label>
                        <Textarea />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Fazer Comentário</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}