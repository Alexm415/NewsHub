const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    articletitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    articleimg: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    articleurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articledecription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starrating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "rating",
  }
);

module.exports = Rating;
