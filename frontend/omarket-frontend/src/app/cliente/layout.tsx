import { GuardRoute } from "@/components/GuardRoute";

export default function ClienteLayout ( {children} : {children : React.ReactNode} ) {
    return(
        <GuardRoute role="CLIENTE">
            {children}
        </GuardRoute>
    );
}