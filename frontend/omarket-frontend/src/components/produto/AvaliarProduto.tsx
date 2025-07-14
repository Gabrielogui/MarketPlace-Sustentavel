import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { Avaliacao } from "@/core";
import { adicionarAvaliacao } from "@/service/avaliacao/avaliacaoService";

export interface AvaliarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    produtoId: number;
}

export default function AvaliarProduto ({isOpen, onOpenChange, produtoId}:AvaliarProdutoProps) {

    const { user } = useContext(AuthContext);

    // |=======| ESTADOS DOS COMENTÁRIOS |=======|
    const [comentario, setComentario] = useState("");
    const [nota, setNota] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        
        if (!user) {
            toast.error("Você precisa estar logado para avaliar.");
            return;
        }
        if (nota === undefined) {
            toast.error("Selecione uma nota de 0 a 10.");
            return;
        }

        const payload: Avaliacao = {
            clienteId: user.id,
            produtoId: produtoId,
            comentario: comentario,
            nota: nota,
            dataModificacao: new Date().toISOString()
        };

        try {
            setLoading(true);
            await adicionarAvaliacao(payload);
            toast.success("Avaliação enviada com sucesso!");
            onOpenChange(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Erro ao avaliar produto:", err);
            toast.error(err.response?.data?.message || "Falha ao enviar avaliação.");
        } finally {
            setLoading(false);
        }
    };

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
                            <Select onValueChange={(v) => setNota(Number(v))} value={nota?.toString()}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma nota de 0-10"  />
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
                        <Textarea value={comentario} rows={2}
                            onChange={(e) => setComentario(e.target.value)} />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        {loading ? "Enviando..." : "Enviar Avaliação"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}