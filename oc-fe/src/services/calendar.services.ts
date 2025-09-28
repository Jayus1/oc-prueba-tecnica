import axiosConfig from "../config/axios.config";
import type { CalendarSuggestionDto } from "../DTO/CalendarSuggestionDTO";

export const calendarService = {
    // POST /calendar/suggestions - Obtener sugerencias de calendario
    getSuggestions: async (data: CalendarSuggestionDto): Promise<string[]> => {

        const response = await axiosConfig.post("/calendar/suggestions", data);
        return response.data;
    },
};