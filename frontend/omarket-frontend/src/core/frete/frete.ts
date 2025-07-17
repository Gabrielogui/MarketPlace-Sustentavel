export interface Frete {
    id: number;
    nome: string;
    valor: number; // A propriedade que estava faltando no tipo
    prazoEntrega: number;
}