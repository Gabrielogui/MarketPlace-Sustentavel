import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export default function MeusPedidos () {
    return(
        <div className="flex flex-col gap-10">
            {/* TÍTULO DOS MEUS PEDIDOS */}
            <div>
                <Label className="text-3xl font-bold">Meus Pedidos</Label>
            </div>
            {/* MOSTRANDO O PEDIDO */}
            <div className="flex flex-col gap-5">
                {/* INFORMAÇÃO GERAL DO PEDIDO */}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-12">
                        <Label>XX/XX/XXXX</Label>
                        <Label>R$ XXX,XX</Label>
                        <Label>Status: Em entrega</Label>
                        <Label>Id do Pedido: XXX</Label>
                    </div>
                    <div>
                        <Button>
                            <Trash2></Trash2>
                            Excluir Pedido
                        </Button>
                    </div>
                </div>
                {/* TODOS OS PRODUTOS DO PEDIDO */}
                <div>

                </div>
            </div>
        </div>
    );
}