"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      Organization.hasMany(models.Slides)
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      welcomeText: DataTypes.TEXT,
      aboutUsText: DataTypes.TEXT,
      facebook: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      instagram: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Organization",
      timestamps: true,
      paranoid: true,
    }
  );
  return Organization;
};
