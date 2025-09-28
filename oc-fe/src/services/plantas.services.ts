import axiosConfig from "../config/axios.config";
import type { PlantasType } from "../types/Plantas.type";
import type { PlantasPostDto } from "../DTO/PlantasPostDTO";

export const plantasService = {
    getAllPlantas: async (nombre?: string): Promise<PlantasType[]> => {
        const response = await axiosConfig.get("/plantas", {
            params: {
                nombre: nombre
            }
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