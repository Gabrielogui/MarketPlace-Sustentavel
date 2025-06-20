import { GuardRoute } from "@/components/GuardRoute";

export default function FornecedorHome () {
    return(
            <GuardRoute role="FORNECEDOR">
                <div>
                    <h1 className="text-4xl">Fornecedor</h1>
                </div>
            </GuardRoute>
    )
}