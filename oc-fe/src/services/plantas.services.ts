import axiosConfig from "../config/axios.config";
import type { PlantasType } from "../types/Plantas.type";
import type { PlantasPostDto } from "../DTO/PlantasPostDTO";
import type { PaginationParams } from "../interfaces/PaginationParams.interface";
import type { PaginatedResponse } from "../interfaces/PaginatedResponse.interface";

export const plantasService = {
    getAllPlantas: async (params: PaginationParams): Promise<PaginatedResponse<PlantasType>> => {
        const response = await axiosConfig.get("/plantas", {
            params
        });
        return response.data;
    },

    getPlantaById: async (id: number): Promise<PlantasType> => {
        const response = await axiosConfig.get(`/plantas/${id}`);
        return response.data;
    },

    createPlanta: async (data: PlantasPostDto): Promise<PlantasType> => {
        const response = await axiosConfig.post("/plantas", data);
        return response.data;
    },

    updatePlanta: async (id: number, data: PlantasPostDto): Promise<PlantasType> => {
        const response = await axiosConfig.put(`/plantas/${id}`, data);
        return response.data;
    },

    deletePlanta: async (id: number): Promise<void> => {
        await axiosConfig.delete(`/plantas/${id}`);
    },
};