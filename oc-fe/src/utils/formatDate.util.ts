export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'Sin fecha';

    const d = date instanceof Date ? date : new Date(date);

    return d.toLocaleDateString('es-DO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
