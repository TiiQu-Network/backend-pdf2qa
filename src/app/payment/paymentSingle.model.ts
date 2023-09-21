import { Sequelize, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";

const initPaymentSingleModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "PaymentSingle",
      {},
      {
        modelName: "PaymentSingle",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init paymentSingle model",
    });
  }
  return;
};

const initPaymentSingleAssociations = async (
  paymentSingleModel: ModelStatic<Model>,
  paymentTypeModel: ModelStatic<Model>,
  paymentTypeMappingModel: ModelStatic<Model>
) => {
  try {
    paymentSingleModel.belongsTo(paymentTypeMappingModel, {
      foreignKey: {
        name: "id",
        allowNull: false,
      },
    });
    paymentSingleModel.belongsTo(paymentTypeModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed paymentSingle associations",
    });
  }
};

export { initPaymentSingleModel, initPaymentSingleAssociations };
