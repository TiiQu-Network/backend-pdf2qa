import { isBinary } from "../../../utils/pdfValidation";
import fs from 'fs';
import path from 'path';

describe('isBinary', () => {
  it('Should return false if the value is not binary', async () => {
    const invalidData = "invalidBase64Pdf";
    const result = await isBinary(invalidData);
    expect(result).toEqual(false);
  })
  
  it('Should return true if the value is binary', async () => {
    // prep: convert PDF file to binary
    const validPdfPath = '../../assets/validPdf.pdf' 
    const buffer = fs.readFileSync(path.resolve(__dirname, validPdfPath));
    const result = await isBinary(buffer);
    expect(result).toEqual(true);

  })
});