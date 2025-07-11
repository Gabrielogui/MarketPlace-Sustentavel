import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { cadastrarRequest, CadastroPayload } from "@/service/usuario/authService";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

export default function CadastroForm () {

    // |=======| ROUTER |=======|
    const router = useRouter();

    // |=======| ESTADO PARA SABER SE FOI SELECIONADO O CLIENTE OU FORNECEDOR NO RADIOGROUP |=======|
    const [tipoUsuario, setTipoUsuario] = useState<'Cliente' | 'Fornecedor'>('Cliente');

    const [form, setForm] = useState<CadastroPayload>({
        nome: '', email: '', senha: '', telefone: '', tipoUsuario: "FORNECEDOR", cpf: '', cnpj: '', dataNascimento: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    // |=======| ESTADOS DO CALENDÁRIO |=======|
    const [isOpenCalendarioPopover, setIsOpenCalendarioPopover] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    // |=======| MÉTODO PARA CAPTURAR MUDANÇA NOS INPUTS |=======|
    const handleChange = (field: keyof CadastroPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    // |=======| MÉTODO PARA CADASTRAR USUÁRIO QUANDO APERTAR O BOTÃO DE CADASTRAR 
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            let payload;

            if (form.tipoUsuario === 'CLIENTE') {
                payload = {
                    nome: form.nome,
                    email: form.email,
                    senha: form.senha,
                    telefone: form.telefone,
                    cpf: form.cpf,
                    dataNascimento: form.dataNascimento,
                    tipoUsuario: form.tipoUsuario,
                };
            } else {
                payload = {
                    nome: form.nome,
                    email: form.email,
                    senha: form.senha,
                    telefone: form.telefone,
                    cnpj: form.cnpj,
                    tipoUsuario: form.tipoUsuario,
                };
            }

            const data = await cadastrarRequest(payload);

            console.log("Resposta do backend:", data)

            localStorage.setItem('token', data.token);

            toast.success('Cadastro realizado com sucesso!');

            // Redireciona conforme a role
            router.push(form.tipoUsuario === 'CLIENTE' ? '/cliente' : '/fornecedor');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const mensagemErro = err.response?.data?.message;
            console.error('Erro de cadastro (response):', err.response);
            setError(mensagemErro);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

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
                        <Input onChange={handleChange('nome')} placeholder="Digite seu Nome"></Input>
                    </div>
                    <div className="flex gap-3 justify-end-safe items-baseline-last">
                        <div className="flex flex-col gap-2 w-full">
                            <Label>E-mail</Label>
                            <Input onChange={handleChange('email')} placeholder="email@exemplo.com"></Input>
                        </div>
                        <div className="">
                            <Popover open={isOpenCalendarioPopover} onOpenChange={setIsOpenCalendarioPopover}>
                                <PopoverTrigger asChild>
                                    <Button id="date" variant={"outline"} size={"icon"}>
                                        <CalendarDays />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                        setDate(date)
                                        setIsOpenCalendarioPopover(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                {/* SENHA ; REPETIR ; CNPJ ; TELEFONE ; CLIENTE ; VENDEDOR */}
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Senha</Label>
                            <Input onChange={handleChange('senha')} type="password" placeholder="Informe a senha"></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Repita a senha</Label>
                            <Input type="password" placeholder="Informe a senha"></Input>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>{tipoUsuario === 'Cliente' ? 'cpf' : 'cnpj'}</Label>
                            <Input onChange={tipoUsuario === 'Cliente' ? handleChange('cpf') : handleChange('cnpj')} placeholder={
                                tipoUsuario === 'Cliente' ? 'XXX.XXX.XXX-XX' : "XX.XXX.XXX/XXXX-XX"
                            }></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Telefone</Label>
                            <Input onChange={handleChange('telefone')} placeholder="(XX) X XXXX-XXXX"></Input>
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
                    <Button onClick={handleSubmit} className="w-full">{loading ? 'Cadastrando...' : 'Cadastrar'}</Button>
                </div>
            </div>
        </div>
    );
}