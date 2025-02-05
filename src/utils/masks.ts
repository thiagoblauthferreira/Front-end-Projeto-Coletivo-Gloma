export const zipCodeMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.slice(0, 8);
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export const phoneMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const weightMask = (value: string) => {
  if (!value) return "";
  const valueClean = value.replace(/\D/g, '');
  const intPart = valueClean.slice(0, -2);
  const decimalPart = valueClean.slice(-2);
  const weightFormatted = intPart + '.' + decimalPart;
  return weightFormatted;  
};
