import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

export default function CadastroForm () {

    const [tipoUsuario, setTipoUsuario] = useState<'Cliente' | 'Fornecedor'>('Cliente');

    return(
        <div>
            <div className="">
                <h2 className="text-2xl font-bold text-center">Cadastre-se</h2>
            </div>
            <div className="flex flex-col gap-5">
                {/* NOME E EMAIL */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label>{tipoUsuario === 'Cliente' ? 'Nome Completo' : 'Nome Completo da Empresa'}</Label>
                        <Input placeholder="Digite seu Nome"></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>E-mail</Label>
                        <Input placeholder="email@exemplo.com"></Input>
                    </div>
                </div>
                {/* SENHA ; REPETIR ; CNPJ ; TELEFONE ; CLIENTE ; VENDEDOR */}
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Senha</Label>
                            <Input type="password" placeholder="Informe a senha"></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Repita a senha</Label>
                            <Input type="password" placeholder="Informe a senha"></Input>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>{tipoUsuario === 'Cliente' ? 'cpf' : 'cnpj'}</Label>
                            <Input placeholder={
                                tipoUsuario === 'Cliente' ? 'XXX.XXX.XXX-XX' : "XX.XXX.XXX/XXXX-XX"
                            }></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Telefone</Label>
                            <Input placeholder="(XX) X XXXX-XXXX"></Input>
                        </div>
                    </div>
                    <RadioGroup defaultValue="Fornecedor" 
                        value={tipoUsuario} 
                        onValueChange={(value) => setTipoUsuario(value as 'Cliente' | 'Fornecedor')}
                        className="flex flex-row gap-7 w-full justify-between">
                            <div className="flex flex-row gap-5">
                                <RadioGroupItem value="Cliente" id="r1" />
                                <Label>Cliente</Label>
                            </div>
                            <div className="flex flex-row gap-5">
                                <RadioGroupItem value="Fornecedor" id="r2" />
                                <Label>Fornecedor</Label>
                            </div>
                    </RadioGroup>
                </div>
                {/* CARTA DE MOTIVAÇÃO */}
                { tipoUsuario === 'Fornecedor' &&
                <div className="flex flex-col gap-2">
                    <Label>Carta de Motivação</Label>
                    <Textarea className="h-24" placeholder="Informe sua motivação"/>
                </div>
                }
                {/* CADASTRAR */}
                <div>
                    <Button className="w-full">Cadastrar</Button>
                </div>
            </div>
        </div>
    );
}