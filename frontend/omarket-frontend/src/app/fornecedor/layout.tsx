import { GuardRoute } from "@/components/GuardRoute";

export default function FornecedorLayout ({children} : {children : React.ReactNode}) {
    return(
        <GuardRoute role="FORNECEDOR">
            {children}
        </GuardRoute>
    );
}