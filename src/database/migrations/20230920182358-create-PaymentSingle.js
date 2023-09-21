"use strict";

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("PaymentSingle", {
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
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    return await queryInterface.dropTable("PaymentSingle");
  },
};
