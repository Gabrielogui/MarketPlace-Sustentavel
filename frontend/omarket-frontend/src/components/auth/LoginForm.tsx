import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm () {
    return(
        <div>
            <div className="">
                <h2 className="text-2xl font-bold text-center">Efetue o Login</h2>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="email@exemplo.com"></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Senha</Label>
                    <Input type="password" placeholder="Insira a senha"></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>esqueci a senha</Label>
                    <Button className="w-full">Fazer Login</Button>
                </div>
            </div>
        </div>
    );
}