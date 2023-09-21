"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("PaymentRecurring", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "PaymentTypeMapping",
          key: "id",
        },
        primaryKey: true,
      },
      paymentTypeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "PaymentType",
          key: "id",
        },
      },
      recurringStatus: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      cancelAtPeriodEnd: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      currentPeriodStart: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      currentPeriodEnd: {
        type: Sequelize.DataTypes.DATE,
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
    return await queryInterface.dropTable("PaymentRecurring");
  },
};
