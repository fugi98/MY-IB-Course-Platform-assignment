// utils/createPdf.ts
import { PDFDocument, rgb } from 'pdf-lib';

export async function createPdfWithLoremIpsum() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();

  const loremIpsumText = `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`;
  page.drawText(loremIpsumText, {
    x: 50,
    y: height - 100,
    size: 12,
    color: rgb(0, 0, 0),
    lineHeight: 14,
    maxWidth: 500,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
