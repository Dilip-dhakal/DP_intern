import { stringify } from "csv-stringify/sync";

export const exportCsv = <T extends Record<string, any>>(
  data: T[]
): string => {
  return stringify(data, {
    header: true,
  });
};