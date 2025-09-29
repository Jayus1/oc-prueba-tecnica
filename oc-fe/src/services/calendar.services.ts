import axiosConfig from "../settings/axios.config";
import type { CalendarSuggestionDto } from "../dtos/calendarSuggestion.dto";
import type { PaginatedResponse } from "../interfaces/paginatedResponse.interface";

export const calendarService = {
    getSuggestions: async (data: CalendarSuggestionDto, page: number = 1): Promise<PaginatedResponse<string>> => {
        const response = await axiosConfig.post(`/calendar/suggestions?page=${page}&limit=10`, data);
        return response.data;
    },
};