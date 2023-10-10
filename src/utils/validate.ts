import * as yup from "yup";
import { ObjectSchema } from "yup";
import logger from "./logger";

export interface ValidationSchemas {
  [key: string]: ObjectSchema<{ pdfFile: string }>;
}

export interface ValidateParams {
  [key: string]: string | number | boolean | object;
}

const validationSchemas: ValidationSchemas = {
  uploadPdf: yup
    .object()
    .shape({
      pdfFile: yup.string().required(),
    })
    .noUnknown(),
};

export const validate = async (lambdaName: string, params: ValidateParams) => {
  try {
    if (typeof params !== "object" || typeof lambdaName !== "string") {
      throw new Error("argument type error", {
        cause: { lambdaName, params },
      });
    }

    const schema = validationSchemas[lambdaName];
    if (!schema) {
      throw new Error("lambdaName argument not found in validationSchemas", {
        cause: { lambdaName },
      });
    }

    await schema.validate(params, { abortEarly: false, strict: true });
    return true;
  } catch (e) {
    logger.error(e);
    return false;
  }
};
