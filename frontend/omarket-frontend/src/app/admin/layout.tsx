import { GuardRoute } from "@/components/GuardRoute";

export default function AdminLayout ({children} : {children : React.ReactNode}) {
    return(
        <GuardRoute role="ADMINISTRADOR">
            {children}
        </GuardRoute>
    );
}