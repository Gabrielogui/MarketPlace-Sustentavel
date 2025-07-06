import { AlertCircle, BookOpen, DollarSign, Info, Package, PencilLine, X } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Textarea } from "../ui/textarea";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: string;
}

export interface EditarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    produto: Produto | null;
}

export default function EditarProduto ({isOpen, onOpenChange, produto}:EditarProdutoProps) {
    // |=======| USESTATES DE PRODUTO |=======|
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(0);
    
    // |=======| USESTATE DE VALIDAÇÃO DE ERRO |=======|
    const [erros, setErros] = useState({
        nome: false,
        preco: false,
        estoque: false
    });
    
    // |=======|  QUANDO O PRODUTO PROP MUDAR, AUTUALIZA OS ESTADOS |=======|
    useEffect(() => {
        if (produto) {
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setEstoque(produto.estoque);
        }
    }, [produto]);

    // |=======| FUNÇÃO PARA VALIDAÇÃO DOS CAMPOS |=======|
    const validarCampos = () => {
        const novosErros = {
            nome: !nome.trim(),
            preco: preco <= 0,
            estoque: estoque < 0
        };
        
        setErros(novosErros);
        return !Object.values(novosErros).some(erro => erro);
    };
    
    // |=======| FUNÇÃO PARA SALVAR AS ALTERAÇÕES |=======|
    const handleSalvar = () => {
        if (validarCampos() && produto) {
            // Criar objeto com as alterações
            const produtoAtualizado: Produto = {
                ...produto,
                nome,
                descricao,
                preco,
                estoque
            };
            
            console.log("Produto atualizado:", produtoAtualizado); // O BACKEND SERÁ CHAMADO AQUI (MÉTODO PARA EDITAR O PRODUTO)
            // Aqui é a futura chamada do backend
            onOpenChange(false);
        }
    };
    
    // |=======| FUNÇÃO PARA RESETAR O PRODUTO AO FECHAR |=======|
    const handleClose = () => {
        if (produto) {
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setEstoque(produto.estoque);
        }
        setErros({ nome: false, preco: false, estoque: false });
        onOpenChange(false);
    };

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <div className="mx-auto w-full h-full flex flex-col">
                    <DrawerHeader className="flex flex-row justify-between items-start border-b">
                        <div>
                            <DrawerTitle className="text-2xl flex items-center gap-2">
                                <PencilLine size={24} />
                                Editar Produto
                            </DrawerTitle>
                            <DrawerDescription>Edite seu produto</DrawerDescription>
                        </div>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => onOpenChange(false)}
                            className="mt-1"
                        >
                            <X />
                        </Button>
                    </DrawerHeader>
                    {/* |=======| CORPO DO DRAWER |=======| */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        {/* |=======| CARD COM RESUMO DO PRODUTO |=======| */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <BookOpen size={18} />
                                        Resumo do Produto
                                    </h3>
                                    <p className="text-sm text-gray-500">Valores atuais antes das alterações</p>
                                </div>
                                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Ativo
                                </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded border">
                                    <p className="text-sm text-gray-500">Nome</p>
                                    <p className="font-medium truncate">{produto?.nome}</p>
                                </div>
                                
                                <div className="bg-white p-3 rounded border">
                                    <p className="text-sm text-gray-500">Preço</p>
                                    <p className="font-medium">R$ {produto?.preco.toFixed(2)}</p>
                                </div>
                                
                                <div className="bg-white p-3 rounded border">
                                    <p className="text-sm text-gray-500">Estoque</p>
                                    <p className="font-medium">{produto?.estoque} unidades</p>
                                </div>
                                
                                <div className="bg-white p-3 rounded border">
                                    <p className="text-sm text-gray-500">Categoria</p>
                                    <p className="font-medium">Frutas Orgânicas</p>
                                </div>
                            </div>
                        </div>

                        {/* |=======| INPUTS DE EDIÇÃO |=======| */}
                        <div className="space-y-6">
                            {/* Campo Nome */}
                            <div>
                                <Label className="flex items-center gap-2 mb-2">
                                    Nome do Produto
                                    {erros.nome && (
                                        <span className="text-red-500 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            Obrigatório
                                        </span>
                                    )}
                                </Label>
                                <Input
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Nome do produto"
                                    className={erros.nome ? "border-red-500" : ""}
                                />
                                {erros.nome && (
                                    <p className="text-red-500 text-sm mt-1">Por favor, informe o nome do produto</p>
                                )}
                            </div>
                            
                            {/* Campo Descrição */}
                            <div>
                                <Label className="flex items-center gap-2 mb-2">
                                    Descrição do Produto
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info size={16} className="text-gray-400 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Descreva detalhes importantes sobre o produto</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Descrição detalhada do produto..."
                                    rows={4}
                                />
                            </div>
                            
                            {/* Campos Preço e Estoque */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Preço */}
                                <div>
                                    <Label className="flex items-center gap-2 mb-2">
                                        <DollarSign size={16} />
                                        Preço (R$)
                                        {erros.preco && (
                                            <span className="text-red-500 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                Inválido
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        type="number"
                                        value={preco}
                                        onChange={(e) => setPreco(Number(e.target.value))}
                                        className={erros.preco ? "border-red-500" : ""}
                                    />
                                    {erros.preco && (
                                        <p className="text-red-500 text-sm mt-1">O preço deve ser maior que zero</p>
                                    )}
                                </div>
                                
                                {/* Estoque */}
                                <div>
                                    <Label className="flex items-center gap-2 mb-2">
                                        <Package size={16} />
                                        Estoque
                                        {erros.estoque && (
                                            <span className="text-red-500 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                Inválido
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        type="number"
                                        value={estoque}
                                        onChange={(e) => setEstoque(Number(e.target.value))}
                                        className={erros.estoque ? "border-red-500" : ""}
                                    />
                                    {erros.estoque && (
                                        <p className="text-red-500 text-sm mt-1">O estoque não pode ser negativo</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* |=======| RODAPÉ/FOOTER |=======| */}
                    <div className="border-t p-4 flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleSalvar}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}