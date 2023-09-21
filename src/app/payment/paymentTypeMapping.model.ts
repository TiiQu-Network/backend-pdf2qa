import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";
import { PAYMENT_TYPES } from "src/config/constants.js";

const initPaymentTypeMappingModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "PaymentTypeMapping",
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
        modelName: "PaymentTypeMapping",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init paymentTypeMapping model",
    });
  }
  return;
};

const initPaymentTypeMappingAssociations = async (
  paymentTypeMappingModel: ModelStatic<Model>,
  paymentTypeModel: ModelStatic<Model>,
  paymentSingleModel: ModelStatic<Model>,
  paymentRecurringModel: ModelStatic<Model>,
  paymentItemModel: ModelStatic<Model>
) => {
  try {
    paymentTypeMappingModel.hasOne(paymentItemModel);
    paymentTypeMappingModel.hasOne(paymentSingleModel);
    paymentTypeMappingModel.hasOne(paymentRecurringModel);
    paymentTypeMappingModel.belongsTo(paymentTypeModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed paymentTypeMapping associations",
    });
  }
};

export { initPaymentTypeMappingModel, initPaymentTypeMappingAssociations };
