'use client'

import CadastroForm from "@/components/auth/CadastroForm";
import LoginForm from "@/components/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login () {

    return(
        <div className="flex flex-col items-center w-full gap-5">
            <div className="w-full max-w-md space-y-4">
                <Tabs defaultValue={"Login"} className="space-y-4">
                
                <TabsList  className="w-full">
                    <TabsTrigger value="Login" >Login</TabsTrigger>
                    <TabsTrigger value="Cadastro">Cadastre</TabsTrigger>
                </TabsList>

                    <TabsContent value="Login" className="space-y-4">
                        <LoginForm />
                    </TabsContent>

                    <TabsContent value="Cadastro" className="space-y-4">
                        <CadastroForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}