"use client"

import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import EditarProduto from "../produto/EditarProduto";
import InativarProduto from "../produto/InativarProduto";
import { Produto } from "@/core";
import { desativarProduto } from "@/service/produto/produtoService";
import { toast } from "sonner";

interface ProdutoFornecedorCardProps {
    produto: Produto;
}

export default function ProdutoFornecedorCard ({ produto }: ProdutoFornecedorCardProps) {
    const [isDrawerEditarProdutoOpen, setIsDrawerEditarProdutoOpen] = useState(false);
    const [isAlertDialogInativarProdutoOpen, setIsAlertDialogInativarProdutoOpen] = useState(false);

    // |=======| FUNÇÃO PARA DESATIVAR(INATIVAR) PRODUTO |=======|
    const handleInativar = async (id:number) => {
        try {
            await desativarProduto(id);
            toast.success("Produto desativado com sucesso!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            const mensagemErro = error.response?.data?.message || "Falha ao inativar a conta.";
            toast.error(mensagemErro);
            console.error("Erro ao inativar conta:", error);
        } finally {

        }
    }
    
    return(
        <div className="flex flex-row gap-2 p-2 hover:shadow hover:scale-105 transition-all ">
            <Image src={"https://picsum.photos/150/150"} alt="Produto" height={150} width={150}></Image>
            <div className="flex flex-col justify-between">
                <Label className="text-2xl">{produto.nome}</Label>
                <Label className="text-gray-500">{produto.categoriaId}</Label>
                <Label className="text-gray-500">{produto.preco}</Label>
                <div className="flex flex-row justify-start gap-4">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setIsDrawerEditarProdutoOpen(true);
                    }} 
                        className="cursor-pointer" variant={"outline"} size={"icon"}>
                        <PencilLine/>
                    </Button>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setIsAlertDialogInativarProdutoOpen(true);
                    }} 
                        className="cursor-pointer" variant={"outline"} size={"icon"}>
                        <Trash2/>
                    </Button>
                </div>
            </div>
            <EditarProduto isOpen={isDrawerEditarProdutoOpen} onOpenChange={setIsDrawerEditarProdutoOpen} produto={produto}/>
            <InativarProduto isOpen={isAlertDialogInativarProdutoOpen} onOpenChange={setIsAlertDialogInativarProdutoOpen} onConfirm={() => handleInativar(produto.id)}/>
        </div>
    );
}