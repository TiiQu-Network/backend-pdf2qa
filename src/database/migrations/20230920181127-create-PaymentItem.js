"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("PaymentItem", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      paymentTypeMappingId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "PaymentTypeMapping",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      paymentProvider: {
        type: Sequelize.DataTypes.ENUM("stripe"),
        defaultValue: "stripe",
        allowNull: false,
      },
      paymentProviderCustomerId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      paymentProviderPaymentId: {
        type: Sequelize.DataTypes.STRING,
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
    return await queryInterface.dropTable("PaymentItem");
  },
};
