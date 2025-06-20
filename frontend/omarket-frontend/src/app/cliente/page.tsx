import { GuardRoute } from "@/components/GuardRoute";

export default function ClienteHome () {
    return(
            <GuardRoute role="CLIENTE">
                <div>
                    <h1 className="text-4xl">CLIENTE</h1>
                </div>
            </GuardRoute>
    )
}