import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
//import { useRouter } from "next/navigation";
import { loginRequest } from "@/service/usuario/authService";
import { toast } from "sonner";

export default function LoginForm () {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    //const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log(email)
            console.log(senha)
            const response = await loginRequest({ email, senha });

            const token = response.data.token;

            localStorage.setItem("token", token);

            toast.success("Login realizado com sucesso!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            toast.error("Email ou senha incorretos!");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div>
            <div className="">
                <h2 className="text-2xl font-bold text-center">Efetue o Login</h2>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="email@exemplo.com" onChange={(e) => setEmail(e.target.value)}></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Senha</Label>
                    <Input type="password" placeholder="Insira a senha" onChange={(e) => setSenha(e.target.value)}></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>esqueci a senha</Label>
                    <Button onClick={handleLogin} className="w-full">{loading ? "Entrando" : "Fazer Login"}</Button>
                </div>
            </div>
        </div>
    );
}