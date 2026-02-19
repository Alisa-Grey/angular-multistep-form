export const capitalizeString = (value: string) => {
  const str = value.includes('-') ? value.split('-') : value;

  const capitalize = (val: string): string => {
    return `${val.charAt(0).toUpperCase()}${val.slice(1).toLowerCase()}`;
  };

  return Array.isArray(str) ? str.map((part) => capitalize(part)).join('-') : capitalize(str);
};
