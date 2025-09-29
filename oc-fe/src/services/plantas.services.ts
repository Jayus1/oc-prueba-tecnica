import axiosConfig from "../settings/axios.config";
import type { PlantasType } from "../types/plantas.type";
import type { PlantasPostDto } from "../dtos/plantasPost.dto";
import type { PaginationParams } from "../interfaces/paginationParams.interface";
import type { PaginatedResponse } from "../interfaces/paginatedResponse.interface";

export const plantasService = {
    getAllPlantas: async (params: PaginationParams): Promise<PaginatedResponse<PlantasType>> => {
        const response = await axiosConfig.get("/plantas", {
            params
        });

        return response.data;
    },

    getPlantaById: async (id: string): Promise<PlantasType> => {
        const response = await axiosConfig.get(`/plantas/${id}`);
        return response.data;
    },

    createPlanta: async (data: PlantasPostDto): Promise<PlantasType> => {
        const response = await axiosConfig.post("/plantas", data);
        return response.data;
    },

    updatePlanta: async (id: string, data: PlantasPostDto): Promise<PlantasType> => {
        const response = await axiosConfig.put(`/plantas/${id}`, data);
        return response.data;
    },

    deletePlanta: async (id: string): Promise<void> => {
        await axiosConfig.delete(`/plantas/${id}`);
    },

    getPlantasForSelect: async (): Promise<PlantasType[]> => {
        const response = await axiosConfig.get("/plantas/select");
        return response.data;
    },
};