import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";


export default function Login () {
    return(
        <div className="flex flex-col justify-center items-center w-full gap-5 py-10">
            <div className="w-full max-w-md space-y-4">
                <div className="">
                    <h2 className="text-2xl font-bold text-center">Cadastre-se</h2>
                </div>
                <div className="flex flex-col gap-5">
                    {/* NOME E EMAIL */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label>Nome Completo da Empresa</Label>
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
                                <Label>cnpj</Label>
                                <Input placeholder="XX.XXX.XXX/XXXX-XX"></Input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Telefone</Label>
                                <Input placeholder="(XX) X XXXX-XXXX"></Input>
                            </div>
                        </div>
                        <RadioGroup defaultValue="Fornecedor"
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
                    <div className="flex flex-col gap-2">
                        <Label>Carta de Motivação</Label>
                        <Textarea className="h-24" placeholder="Informe sua motivação"/>
                    </div>
                    {/* CADASTRAR */}
                    <div>
                        <Button className="w-full">Cadastrar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}