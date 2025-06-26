import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Fragment } from "react";

export interface ProdutoNoPagamento {
    id: number;
    nome: string;
    categoria: string;
    precoUnitario: number;
    quantidade: number;
    fornecedor: string;
    imagemUrl: string;
}

export default function Pagamento () {

    const listaItensPagamento: ProdutoNoPagamento[] = [
        {id: 1, nome: 'Maçã', categoria: 'Frutas', precoUnitario: 3.5, quantidade: 2, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100'},
        {id: 2, nome: 'Vinho tinto', categoria: 'Vinho', precoUnitario: 3.5, quantidade: 2, fornecedor: 'Fornecedor A', imagemUrl: 'https://picsum.photos/100/100'}
    ]

    return(
        <div className="flex flex-col gap-10">
            {/* PAGAMENTO */}
            <div>
                <Label className="text-3xl font-bold">Pagamento</Label> 
            </div>
            {/* TABELA COM PRODUTOS PARA O PAGAMENTO + PREÇOS */}
            <div>
                <Table>
                    <Fragment>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produtos</TableHead>
                                <TableHead>Preço Unitário</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Preço Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { listaItensPagamento.map((produto) => {
                                return(
                                    <TableRow key={produto.id}>
                                        <TableCell className="flex flex-row gap-5">
                                            <Image src={produto.imagemUrl} alt={produto.nome} height={100} width={100} /> 
                                            <div className="flex flex-col gap-2">
                                                <Label>{produto.nome}</Label>
                                                <Label>{produto.categoria}</Label>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Label className="">{produto.precoUnitario}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <Label className="">{produto.quantidade}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <Label className="">{produto.precoUnitario * produto.quantidade}</Label>
                                        </TableCell>
                                    </TableRow>
                                )    
                                })
                            }
                        </TableBody>
                    </Fragment>
                </Table>
            </div>
            {/* INFORMÇÃO DO PREÇO TOTAL OU ALTERAÇÃO DO ENDEREÇO */}
            <div>

            </div>
            {/* FINALIZAÇÃO DO PAGAMENTO */}
            <div>

            </div>
        </div>
    );
}