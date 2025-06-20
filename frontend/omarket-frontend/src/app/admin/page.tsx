import { GuardRoute } from "@/components/GuardRoute";

export default function AdministradorHome () {
    return(
            <GuardRoute role="ADMINISTRADOR">
                <div>
                    <h1 className="text-4xl">Administrador</h1>
                </div>
            </GuardRoute>
    )
}