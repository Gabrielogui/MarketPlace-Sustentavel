'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

export interface ProdutoNoCarrinho {
    id: number;
    nome: string;
    categoria: string;
    precoUnitario: number;
    quantidade: number;
    fornecedor: string;
    imagemUrl: string;
}

export default function Carrinho () {

    const produtosMock: ProdutoNoCarrinho[] = [
        { id: 1, nome: 'Maçã', categoria: 'Frutas', precoUnitario: 3.5, quantidade: 2, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100' },
        { id: 2, nome: 'Pera', categoria: 'Frutas', precoUnitario: 4.2, quantidade: 1, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100' },
        { id: 3, nome: 'Arroz', categoria: 'Grãos', precoUnitario: 5.0, quantidade: 3, fornecedor: 'Fornecedor B', imagemUrl: 'https://picsum.photos/100/100' }, 
    ];

    const grouped = useMemo(() => {
        return produtosMock.reduce<Record<string, ProdutoNoCarrinho[]>>((acc, p) => {
            (acc[p.fornecedor] ||= []).push(p);
            return acc;
        }, {});
    }, []);

    return(
        <div className="flex flex-col gap-10">
            {/* TÍTULO + BOTÃO DE FAZER A COMPRA */}
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Favoritos</h1> 
                <Button>Finalizar a Compra</Button>
            </div>
            {/* TABELA DO CARRINHO */}
            <div>
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead><Checkbox/></TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead>Preço Unitário</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Preço Total</TableHead>
                            <TableHead>Excluir</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="w-full">
                        {Object.entries(grouped).map(([fornecedor, itens]) => {
                           // const allChacked = itens.every(p => selected.has(p.id));
                            return(
                                <tbody key={fornecedor}>
                                    {/* LINHA DO FORNECEDOR */}
                                    <TableRow >
                                        <TableCell>
                                            <Checkbox/> {/* EDITAR */}
                                        </TableCell>
                                        <TableCell colSpan={5} className="font-semibold">
                                            {fornecedor}
                                        </TableCell>
                                    </TableRow>

                                    {/* LINHA DO PRODUTO */}
                                    { itens.map((produto) => (
                                        <TableRow key={produto.id}>
                                            <TableCell>
                                                <Checkbox/> {/* EDITAR */}
                                            </TableCell>

                                            <TableCell className="flex flex-row gap-3">
                                                <Image src={produto.imagemUrl} alt="Prouto" height={100} width={100} /> 
                                                <div className="flex flex-col gap-1">
                                                    <Label className="font-semibold">{produto.nome}</Label>    
                                                    <Label className="text-sm text-gray-300">{produto.categoria}</Label>    
                                                </div>  
                                            </TableCell>
                                            
                                            <TableCell>R$ {produto.precoUnitario.toFixed(2)}</TableCell>
                                            <TableCell>{produto.quantidade}</TableCell>
                                            <TableCell>
                                                R$ {(produto.precoUnitario * produto.quantidade).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Button size={"icon"}>
                                                    <Trash2 className="hover:text-red-500 transition-all duration-500"></Trash2>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }

                                </tbody>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}