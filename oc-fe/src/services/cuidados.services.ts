import axiosConfig from "../config/axios.config";
import type { CuidadosPostDto } from "../DTO/CuidadosPostDTO";
import type { CuidadosType } from "../types/Cuidados.type";

export const cuidadosService = {
    getAllCuidados: async (): Promise<CuidadosType[]> => {
        const response = await axiosConfig.get("/cuidados");
        return response.data;
    },

    getCuidadoById: async (id: number): Promise<CuidadosType> => {
        const response = await axiosConfig.get(`/cuidados/${id}`);
        return response.data;
    },

    createCuidado: async (data: CuidadosPostDto): Promise<CuidadosType> => {
        const response = await axiosConfig.post("/cuidados", data);
        return response.data;
    },

    updateCuidado: async (id: number, data: CuidadosPostDto): Promise<CuidadosType> => {
        const response = await axiosConfig.put(`/cuidados/${id}`, data);
        return response.data;
    },

    deleteCuidado: async (id: number): Promise<void> => {
        await axiosConfig.delete(`/cuidados/${id}`);
    },
};