"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("User", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      authProvider: {
        type: Sequelize.DataTypes.ENUM("auth0"),
        defaultValue: "auth0",
        allowNull: false,
      },
      authProviderId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      affiliation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      companyUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    return await queryInterface.dropTable("User");
  },
};
