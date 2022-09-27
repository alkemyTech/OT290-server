const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate({ Category }) {
      this.belongsTo(
        Category,
        {
          foreignKey: {
            name: 'categoryId',
            type: DataTypes.INTEGER,
            allowNull: false,
          },

        },
      );
    }
  }
  News.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'News',
    timestamps: true,
    paranoid: true,
    tableName: 'News',
  });
  return News;
};
