import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import logger from "../../utils/logger.js";

const initArticleGeneratedQAModel = async (sequelize: Sequelize) => {
  try {
    return sequelize.define(
      "ArticleGeneratedQA",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        articleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        paragraph: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isUserEdited: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        modelName: "ArticleGeneratedQA",
        freezeTableName: true,
      }
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed to init article generated QA model",
    });
  }
  return;
};

const initArticleGeneratedQAAssociations = async (
  articleGeneratedQAModel: ModelStatic<Model>,
  articleModel: ModelStatic<Model>
) => {
  try {
    articleGeneratedQAModel.belongsTo(articleModel);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Failed article generated QA associations",
    });
  }
};

export { initArticleGeneratedQAModel, initArticleGeneratedQAAssociations };
