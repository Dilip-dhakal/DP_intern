import PDFDocument from "pdfkit";

export const exportPdf = <
  T extends Record<string, any>
>(
  data: T[]
) => {
  return new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    doc.fontSize(18).text("Finance Report");
    doc.moveDown();
    data.forEach((row) => {
      doc.text(JSON.stringify(row));
    });

    doc.end();
  });
};