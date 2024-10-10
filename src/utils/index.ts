import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export function getNestedValue(obj: { [key: string]: any }, path: string) {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }

  return value;
}

export const formatDate = (
  date: string | Date,
  format: string = "DD/MM/YYYY HH:mm:ss"
): string => {
  const parsedDate = moment(date);
  if (!parsedDate.isValid()) {
    return "Data inválida";
  }

  return parsedDate.format(format);
};

