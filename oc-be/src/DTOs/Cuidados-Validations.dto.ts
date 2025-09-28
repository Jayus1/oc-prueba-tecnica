import { TipoCuidado } from '@prisma/client';
import { PrismaService } from '../config/prisma/prisma.service';

export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

