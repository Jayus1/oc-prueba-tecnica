import type { CuidadosType } from "../types/Cuidados.type";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function validateEmptyTime(
  fechaInicio: Date,
  fechaFin: Date,
  idPlanta: number,
  existingCuidados: CuidadosType[],
  excludeCuidadoId?: number
): boolean {
  const plantaCuidados = existingCuidados.filter(
    (cuidado) =>
      cuidado.idPlanta === idPlanta &&
      cuidado.id !== excludeCuidadoId
  );

  const newStartDate = dayjs(fechaInicio);
  const newEndDate = dayjs(fechaFin);

  for (const cuidado of plantaCuidados) {
    const existingStartDate = dayjs(cuidado.fechaInicio);

    const existingEndDate = cuidado.fechaFin ? dayjs(cuidado.fechaFin) : existingStartDate;

    const hasOverlap =
      (newStartDate.isSameOrAfter(existingStartDate) && newStartDate.isSameOrBefore(existingEndDate)) ||
      (newEndDate.isSameOrAfter(existingStartDate) && newEndDate.isSameOrBefore(existingEndDate)) ||
      (newStartDate.isSameOrBefore(existingStartDate) && newEndDate.isSameOrAfter(existingEndDate));

    if (hasOverlap) {
      return false;
    }
  }

  return true; // No hay conflictos, la fecha está disponible
}
