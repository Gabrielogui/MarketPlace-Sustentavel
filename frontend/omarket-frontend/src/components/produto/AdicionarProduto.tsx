import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
//import Image from "next/image";
import { Bookmark, DollarSign, ImageIcon, Package, Plus, Text, Trash2, Upload, Vegan, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Categoria } from "@/core";
import { getListaCategoria } from "@/service/categoria/categoria";
import { toast } from "sonner";

export interface AdicionarProdutoProps{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AdicionarProduto ({isOpen, onOpenChange}:AdicionarProdutoProps) {

    // |=======| USESTATES DO PRODUTO |=======|
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque, setEstoque] = useState(0);
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [imagemFile, setImagemFile] = useState<File | null>(null);

    // |=======| USESTATES DE CATEGORIA |=======|
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaLoading, setCategoriaLoading] = useState(true);

    // |=======| REFERÊNCIA PARA O INPUT DO ARQUIVO |=======|
    const fileInputRef = useRef<HTMLInputElement>(null);

    // |=======| USEEFFECT |=======|
    useEffect(() => {
        async function fetchCategorias() {
            try {
                const categoriaResponse = await getListaCategoria();
                setCategorias(categoriaResponse.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any){
                console.error("Erro ao buscar categorias:", error);
                toast.error(error.categoriaResponse?.data?.message || "Não foi possível carregar as categorias.");
            } finally {
                setCategoriaLoading(false);
            }
        }

        fetchCategorias();
    }, [])

    // |=======| FUNCÇÃO PARA UPLOAD DA IMAGEM |=======|
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagemFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // |=======| FUNÇÃO PARA REMOVAR A IMAGEM |=======|
    const handleRemoveImage = () => {
        setImagemPreview(null);
        setImagemFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // |=======| FUNÇÃO PARA SALVAR PRODUTO MOCK |=======|
    const handleSaveProduct = () => {
        const produto = {
            nome,
            descricao,
            estoque,
            preco,
            categoria,
            imagem: imagemFile
        };
        console.log("Produto salvo:", produto); // FUTURA CHAMADA PARA O BACKEND
        // Aqui você faria a chamada para o backend
        onOpenChange(false);
    };

    return(
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
                <div className="mx-auto w-full h-full flex flex-col">
                    <DrawerHeader className="flex flex-row justify-between items-start border-b">
                        <div>
                            <DrawerTitle className="text-2xl flex items-center gap-2">
                                <Plus size={24} />
                                Adicionar Produto
                            </DrawerTitle>
                            <DrawerDescription>Crie um novo produto para seu catálogo</DrawerDescription>
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
                        <div className="space-y-6">
                            {/* |=======| SELEÇÃO DA IMAGEM |=======| */}
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2">
                                    <ImageIcon size={18}  />
                                    Imagem do Produto
                                </Label>
                                
                                {imagemPreview ? (
                                    <div className="relative group">
                                        <img 
                                            src={imagemPreview} 
                                            alt="Pré-visualização" 
                                            className="w-full h-64 object-contain border rounded-md"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={handleRemoveImage}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ) : (
                                    <div 
                                        className="border-2 border-dashed rounded-xl w-full h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload />
                                        <p className="text-gray-500">Clique para enviar uma imagem</p>
                                        <p className="text-sm text-gray-400 mt-1">Formatos: JPG, PNG, GIF</p>
                                    </div>
                                )}
                                
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            {/* |=======| INFORMAÇÕES BÁSICAS (NOME, DESCRIÇÃO) |=======| */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="nome" className="flex items-center gap-2">
                                        <Vegan size={18} />
                                        Nome do Produto
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Insira o nome do produto"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="descricao" className="flex items-center gap-2">
                                        <Text size={18} />
                                        Descrição
                                    </Label>
                                    <Textarea
                                        id="descricao"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        placeholder="Descreva as características do produto..."
                                        rows={4}
                                    />
                                </div>
                            </div>

                            {/* |=======| INFORMAÇÕES DETALHADAS (ESTOQUE, PREÇO) |=======| */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="estoque" className="flex items-center gap-2">
                                        <Package size={18} />
                                        Estoque
                                    </Label>
                                    <Input
                                        id="estoque"
                                        type="number"
                                        value={estoque}
                                        onChange={(e) => setEstoque(Number(e.target.value))}
                                        min={0}
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="preco" className="flex items-center gap-2">
                                        <DollarSign size={18} />
                                        Preço (R$)
                                    </Label>
                                    <Input
                                        id="preco"
                                        type="number"
                                        value={preco}
                                        onChange={(e) => setPreco(Number(e.target.value))}
                                        min={0}
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* |=======| ESCOLHA DA CATEGORIA |=======| */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="categoria" className="flex items-center gap-2">
                                    <Bookmark size={18} />
                                    Categoria
                                </Label>
                                
                                <Select value={categoria} onValueChange={setCategoria}>
                                    <SelectTrigger className="w-full" id="categoria">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriaLoading ? (
                                            <p>Carregando...</p>
                                        ) : (
                                            categorias.map((categoria) => (
                                                <SelectItem key={categoria.id} value={categoria.nome}>
                                                    <div className="flex flex-col">
                                                        <span>{categoria.nome}</span>
                                                        <span className="text-xs text-gray-500">{categoria.descricao}</span>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* |=======| FOOTER COM OS BOTÕES |=======| */}
                    <div className="border-t p-4 flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleSaveProduct}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Adicionar Produto
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}