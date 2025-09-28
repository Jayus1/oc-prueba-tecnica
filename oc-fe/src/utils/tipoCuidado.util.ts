export const formatTipoCuidado = (tipo: string): string => {
  const tiposMap: Record<string, string> = {
    riego: 'Riego',
    fertilizacion: 'Fertilización',
    poda: 'Poda',
    luz: 'Luz'
  };

  return tiposMap[tipo.toLowerCase()] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
};