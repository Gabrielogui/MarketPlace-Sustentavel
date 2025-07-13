import { Categoria } from "@/core";
import api from "../api";

// |=======| GET DE LISTA DE CATEGORIAS |=======|
export function getListaCategoria(){
    return api.get<Categoria[]>('/categoria/listar');
}