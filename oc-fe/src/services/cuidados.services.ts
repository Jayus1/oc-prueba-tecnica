import axiosConfig from "../settings/axios.config";
import type { CuidadosType } from "../types/cuidados.type";
import type { PaginationParams } from "../interfaces/paginationParams.interface";
import type { PaginatedResponse } from "../interfaces/paginatedResponse.interface";
import type { CuidadosPostDto } from "../dtos/cuidadosPost.dto";

export const cuidadosService = {
    getAllCuidados: async (params?: PaginationParams): Promise<PaginatedResponse<CuidadosType>> => {
        if (params) {
            const response = await axiosConfig.get("/cuidados", {
                params
            });
            return response.data;
        } else {
            const response = await axiosConfig.get("/cuidados");
            return response.data;
        }
    },

    getCuidadoById: async (id: string): Promise<CuidadosType> => {
        const response = await axiosConfig.get(`/cuidados/${id}`);
        return response.data;
    },

    createCuidado: async (data: CuidadosPostDto): Promise<CuidadosType> => {

        const response = await axiosConfig.post("/cuidados", data);
        return response.data;
    },

    updateCuidado: async (id: string, data: CuidadosPostDto): Promise<CuidadosType> => {
        const response = await axiosConfig.put(`/cuidados/${id}`, data);
        return response.data;
    },

    deleteCuidado: async (id: string): Promise<void> => {
        await axiosConfig.delete(`/cuidados/${id}`);
    },

    getCuidadosByPlantId: async (plantId: string): Promise<CuidadosType[]> => {
        const response = await axiosConfig.get(`/cuidados/planta/${plantId}`);
        return response.data;
    },
};