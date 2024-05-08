'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_type: { type: DataTypes.STRING },
    first_name: DataTypes.STRING,
    last_name: { type: DataTypes.STRING, allowNull: true },
    email: DataTypes.STRING,
    email_verified: { type: DataTypes.STRING, allowNull: true },
    password: DataTypes.STRING,
    forgot_password_token: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    country_code: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    zipcode: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    timezone: { type: DataTypes.STRING, allowNull: true },
    ip: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM, values: ['0', '1'], defaultValue: '1' },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });
  return users;
};