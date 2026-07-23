import ExcelJS from "exceljs";

export const exportExcel = async <
  T extends Record<string, any>
>(
  data: T[]
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report");
  worksheet.columns = Object.keys(data[0]).map((key) => ({
    header: key,
    key,
    width: 20,
  }));

  worksheet.addRows(data);

  return workbook.xlsx.writeBuffer();
};