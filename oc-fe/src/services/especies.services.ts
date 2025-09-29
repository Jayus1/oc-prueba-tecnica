import axiosConfig from "../settings/axios.config";
import type { EspeciePostDto } from "../dtos/especiePost.dto";
import type { EspecieType } from "../types/especie.type";
import type { PaginatedResponse } from "../interfaces/paginatedResponse.interface";

export const especiesService = {
    getAllEspecies: async (page: number = 1): Promise<PaginatedResponse<EspecieType>> => {
        const response = await axiosConfig.get(`/especies?page=${page}&limit=10`);
        return response.data;
    },

    getEspeciesForSelect: async (): Promise<EspecieType[]> => {
        const response = await axiosConfig.get("/especies/select");
        return response.data;
    },

    getEspecieById: async (id: string): Promise<EspecieType> => {
        const response = await axiosConfig.get(`/especies/${id}`);
        return response.data;
    },

    createEspecie: async (data: EspeciePostDto): Promise<EspecieType> => {
        const response = await axiosConfig.post("/especies", data);
        return response.data;
    },

    updateEspecie: async (id: string, data: EspeciePostDto): Promise<EspecieType> => {
        const response = await axiosConfig.put(`/especies/${id}`, data);
        return response.data;
    },

    deleteEspecie: async (id: string): Promise<void> => {
        await axiosConfig.delete(`/especies/${id}`);
    },
};