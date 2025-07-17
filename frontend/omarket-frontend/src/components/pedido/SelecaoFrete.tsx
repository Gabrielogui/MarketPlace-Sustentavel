'use client';


import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Loader2, TruckIcon } from "lucide-react";
import { Pedido } from "@/core/pedido"; // Supondo que você tenha um tipo Pedido
import { OpcaoFreteResponse } from "@/core/frete";
import { calcularFrete, selecionarFrete } from "@/service/frete/freteService";

interface SelecaoFreteProps {
    pedido: Pedido;
    cepOrigemMock: string; // Manteremos o CEP de origem mockado por enquanto
    onFreteSelecionado: (frete: OpcaoFreteResponse) => void;
}

export default function SelecaoFrete({ pedido, cepOrigemMock, onFreteSelecionado }: SelecaoFreteProps) {
    const [opcoes, setOpcoes] = useState<OpcaoFreteResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFreteId, setSelectedFreteId] = useState<string | undefined>();

    // Efeito para calcular o frete assim que o componente for montado
    useEffect(() => {
        const calcular = async () => {
            if (!pedido.endereco?.cep) {
                toast.error("Endereço do pedido não encontrado para calcular o frete.");
                return;
            }

            setLoading(true);
            try {
                const { data } = await calcularFrete({
                    cepOrigem: cepOrigemMock,
                    cepDestino: pedido.endereco.cep,
                });
                setOpcoes(data);
                if (data.length === 0) {
                    toast.info("Nenhuma opção de frete encontrada para este CEP.");
                }
            } catch (error: any) {
                console.error("Erro ao calcular frete:", error);
                toast.error(error.response?.data?.message || "Não foi possível calcular o frete.");
            } finally {
                setLoading(false);
            }
        };

        calcular();
    }, [pedido.endereco?.cep, cepOrigemMock]);

    // Função para confirmar a seleção do frete
    const handleSelecionarFrete = async () => {
        if (!selectedFreteId) {
            toast.warning("Por favor, selecione uma opção de frete.");
            return;
        }

        const freteEscolhido = opcoes.find(opt => opt.id.toString() === selectedFreteId);
        if (!freteEscolhido) return;

        setLoading(true);
        try {
            await selecionarFrete(pedido.id, freteEscolhido);
            toast.success(`Frete "${freteEscolhido.name}" definido com sucesso!`);
            onFreteSelecionado(freteEscolhido); // Notifica o componente pai para atualizar o valor total
        } catch (error: any) {
            console.error("Erro ao selecionar frete:", error);
            toast.error(error.response?.data?.message || "Não foi possível definir o frete.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <h3 className="font-bold flex items-center gap-2 text-gray-800"><TruckIcon className="w-5 h-5 text-primary" /> Opções de Entrega</h3>

            <div className="h-64 overflow-y-auto">
                {loading && opcoes.length === 0 ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>Calculando frete...</span>
                    </div>
                ) : (
                    <RadioGroup value={selectedFreteId} onValueChange={setSelectedFreteId} className="space-y-2">
                        {opcoes.map((opcao) => (
                            <div key={opcao.id} className="flex items-center justify-between p-3 border rounded-md bg-white hover:border-primary transition-all">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value={opcao.id.toString()} id={`frete-${opcao.id}`} />
                                    <Label htmlFor={`frete-${opcao.id}`} className="cursor-pointer">
                                        <p className="font-semibold">{opcao.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Prazo: {opcao.delivery_time} dias úteis
                                        </p>
                                    </Label>
                                </div>
                                <span className="font-bold text-lg text-primary">R$ {Number(opcao.price).toFixed(2)}</span>
                            </div>
                        ))}
                    </RadioGroup>
                )}
                
            </div>
            <div>
                {opcoes.length > 0 && (
                    <Button onClick={handleSelecionarFrete} disabled={loading || !selectedFreteId} className="w-full mt-2">
                        {loading ? <Loader2 className="animate-spin" /> : "Definir Transportadora"}
                    </Button>
                )}
            </div>
        </div>
    );
}