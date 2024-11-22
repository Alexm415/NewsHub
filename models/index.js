const User = require("./users");
const Rating = require("./rating");

User.hasMany(Rating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Rating.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Rating };
