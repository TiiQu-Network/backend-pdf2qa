import PDFParser, { Result } from "pdf-parse";

export async function isValidPdf(buffer: Buffer): Promise<Result | false> {
  try {
    return await PDFParser(buffer);
  } catch (error) {
    return false;
  }
}

export async function isBinary(value: unknown): Promise<boolean> {
  return value instanceof Buffer || value instanceof ArrayBuffer;
}
