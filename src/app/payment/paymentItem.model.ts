import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";
import { PAYMENT_PROVIDERS } from "src/config/constants.js";

const initPaymentItemModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "PaymentItem",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        paymentTypeMappingId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentProvider: {
          type: DataTypes.ENUM(...PAYMENT_PROVIDERS),
          defaultValue: PAYMENT_PROVIDERS[0],
          allowNull: false,
        },
        paymentProviderCustomerId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentProviderPaymentId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: "PaymentItem",
        freezeTableName: true,
      },
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init paymentItem model",
    });
  }
  return;
};

const initPaymentItemAssociations = async (
  paymentItemModel: ModelStatic<Model>,
  userModel: ModelStatic<Model>,
  paymentTypeMappingModel: ModelStatic<Model>,
) => {
  try {
    paymentItemModel.belongsTo(userModel);
    paymentItemModel.hasOne(paymentTypeMappingModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed paymentItem associations",
    });
  }
};

export { initPaymentItemModel, initPaymentItemAssociations };
