import axiosConfig from "../settings/axios.config";
import type { UbicacionPostDto } from "../dtos/ubicacionPost.dto";
import type { UbicacionType } from "../types/ubicacion.type";
import type { PaginatedResponse } from "../interfaces/paginatedResponse.interface";

export const ubicacionesService = {
    getAllUbicaciones: async (page: number = 1): Promise<PaginatedResponse<UbicacionType>> => {
        const response = await axiosConfig.get(`/ubicaciones?page=${page}&limit=10`);
        return response.data;
    },

    getUbicacionesForSelect: async (): Promise<UbicacionType[]> => {
        const response = await axiosConfig.get("/ubicaciones/select");
        return response.data;
    },

    getUbicacionById: async (id: string): Promise<UbicacionType> => {
        const response = await axiosConfig.get(`/ubicaciones/${id}`);
        return response.data;
    },

    createUbicacion: async (data: UbicacionPostDto): Promise<UbicacionType> => {
        const response = await axiosConfig.post("/ubicaciones", data);
        return response.data;
    },

    updateUbicacion: async (id: string, data: UbicacionPostDto): Promise<UbicacionType> => {
        const response = await axiosConfig.put(`/ubicaciones/${id}`, data);
        return response.data;
    },

    deleteUbicacion: async (id: string): Promise<void> => {
        await axiosConfig.delete(`/ubicaciones/${id}`);
    },
};