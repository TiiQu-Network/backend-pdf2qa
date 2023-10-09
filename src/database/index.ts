import { Sequelize } from "sequelize";
import config from "../config/config.js";
import logger from "../utils/logger.js";
import { initUserModel, initUserAssociations } from "../app/user/user.model.js";
import {
  initArticleModel,
  initArticleAssociations,
} from "../app/article/article.model.js";
import {
  initArticleGeneratedQAModel,
  initArticleGeneratedQAAssociations,
} from "../app/article/articleGeneratedQA.model.js";

const sequelize = new Sequelize(
  config.db.database || "postgres",
  config.db.username || "",
  config.db.password || "",
  {
    host: config.db.host,
    dialect: "postgres",
    port: config.db.port,
  },
);

const initConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.log({
      level: "info",
      message: "Connection has been established successfully.",
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: `Unable to connect to the database: ${JSON.stringify(err)}`,
    });
  }
};

const initModels = async () => {
  try {
    const User = await initUserModel(sequelize);
    const Article = await initArticleModel(sequelize);
    const ArticleGeneratedQA = await initArticleGeneratedQAModel(sequelize);
    if (!User || !Article || !ArticleGeneratedQA) {
      logger.log({
        level: "error",
        message: `Unable to initialize models: model object missing`,
      });
      return;
    }
    await initUserAssociations(User, Article);
    await initArticleAssociations(Article, User, ArticleGeneratedQA);
    await initArticleGeneratedQAAssociations(ArticleGeneratedQA, Article);
  } catch (err) {
    logger.log({
      level: "error",
      message: `Unable to initialize models: ${JSON.stringify(err)}`,
      infoObject: err,
    });
  }
};

const initSequelize = async () => {
  try {
    await initConnection();
    await initModels();
    await sequelize.sync();
  } catch (err) {
    logger.log({
      level: "error",
      message: `Unable to initialize Sequelize: ${JSON.stringify(err)}`,
    });
  }
};

export default initSequelize;
