import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../..//utils/logger.js";

const initUserModel = (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "User",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        // Other model options go here
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

const initUserAssociations = (model: ModelStatic<Model>) => {
  try {
    // model.hasMany()
    console.log(model);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed user associations",
    });
  }
};

export { initUserModel, initUserAssociations };
