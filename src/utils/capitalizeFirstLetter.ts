export const capitalizeFirstLetter = (string: string) => {
  // Se retorna la primera letra en mayúscula y el resto en minúscula
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};