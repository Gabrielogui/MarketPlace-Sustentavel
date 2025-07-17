import { CalcularFreteParams, OpcaoFreteResponse } from '@/core/frete';
import api from '../api';


export const calcularFrete = (params: CalcularFreteParams) => {
    return api.post<OpcaoFreteResponse[]>('/frete/calcular', null, { params });
};

export const selecionarFrete = (pedidoId: number, freteData: OpcaoFreteResponse) => {
    return api.post(`/frete/selecionar/${pedidoId}`, freteData);
};