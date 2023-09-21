"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("ArticleGeneratedQA", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      articleId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Article",
          key: "id",
        },
      },
      question: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      paragraph: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      isUserEdited: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    return await queryInterface.dropTable("ArticleGeneratedQA");
  },
};
