import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";

const initPaymentRecurringModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "PaymentRecurring",
      {
        recurringStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cancelAtPeriodEnd: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        currentPeriodStart: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        currentPeriodEnd: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        modelName: "PaymentRecurring",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init paymentRecurring model",
    });
  }
  return;
};

const initPaymentRecurringAssociations = async (
  paymentRecurringModel: ModelStatic<Model>,
  paymentTypeModel: ModelStatic<Model>,
  paymentTypeMappingModel: ModelStatic<Model>
) => {
  try {
    paymentRecurringModel.belongsTo(paymentTypeMappingModel, {
      foreignKey: {
        name: "id",
        allowNull: false,
      },
    });
    paymentRecurringModel.belongsTo(paymentTypeModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed paymentRecurring associations",
    });
  }
};

export { initPaymentRecurringModel, initPaymentRecurringAssociations };
