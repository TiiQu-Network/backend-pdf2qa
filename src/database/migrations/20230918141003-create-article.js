"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("Article", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      sourceUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      sourceText: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      keywords: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      uploadedBy: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
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
    return await queryInterface.dropTable("Article");
  },
};
