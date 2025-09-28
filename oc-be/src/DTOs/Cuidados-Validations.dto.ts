import { TipoCuidado } from '@prisma/client';

export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

