import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../..//utils/logger.js";

const initArticleModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "Article",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        filename: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sourceUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sourceText: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        keywords: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: "Article",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init article model",
    });
  }
  return;
};

const initArticleAssociations = async (
  articleModel: ModelStatic<Model>,
  userModel: ModelStatic<Model>,
  articleGeneratedQAModel: ModelStatic<Model>
) => {
  try {
    articleModel.belongsTo(userModel, {
      foreignKey: "uploadedBy",
    });
    articleModel.hasMany(articleGeneratedQAModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed article associations",
    });
  }
};

export { initArticleModel, initArticleAssociations };
