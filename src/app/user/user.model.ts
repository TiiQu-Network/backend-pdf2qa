import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../..//utils/logger.js";
import { AUTH_PROVIDERS } from "src/config/constants.js";

const initUserModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        authProvider: {
          type: DataTypes.ENUM(...AUTH_PROVIDERS),
          defaultValue: AUTH_PROVIDERS[0],
          allowNull: false,
        },
        authProviderId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        affiliation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        companyUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: "User",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init user model",
    });
  }
  return;
};

const initUserAssociations = async (
  userModel: ModelStatic<Model>,
  articleModel: ModelStatic<Model>
  // paymentModel: ModelStatic<Model>
) => {
  try {
    userModel.hasMany(articleModel);
    // userModel.hasMany(paymentModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init user associations",
    });
  }
};

export { initUserModel, initUserAssociations };
