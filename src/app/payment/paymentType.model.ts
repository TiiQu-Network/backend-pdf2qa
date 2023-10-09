import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";
import { PAYMENT_TYPES } from "src/config/constants.js";

const initPaymentTypeModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "PaymentType",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM(...PAYMENT_TYPES),
          allowNull: false,
        },
      },
      {
        modelName: "PaymentType",
        freezeTableName: true,
      },
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init paymentType model",
    });
  }
  return;
};

const initPaymentTypeAssociations = async (
  paymentTypeModel: ModelStatic<Model>,
  paymentSingleModel: ModelStatic<Model>,
  paymentRecurringModel: ModelStatic<Model>,
  paymentTypeMappingModel: ModelStatic<Model>,
) => {
  try {
    paymentTypeModel.hasMany(paymentSingleModel);
    paymentTypeModel.hasMany(paymentRecurringModel);
    paymentTypeModel.hasMany(paymentTypeMappingModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed paymentType associations",
    });
  }
};

export { initPaymentTypeModel, initPaymentTypeAssociations };
