import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'Sin fecha';

    return dayjs(date).format('DD/MM/YYYY HH:mm');
}
