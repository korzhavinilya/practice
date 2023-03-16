import { DataTypes, Model } from 'sequelize';
import sequelize from '../common/db/sequelize';
import RoleModel from './role.model';

class CustomerModel extends Model {}

CustomerModel.init(
  {
    CustomerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Address1: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Address2: {
      type: DataTypes.STRING(50),
    },
    Address3: {
      type: DataTypes.STRING(50),
    },
  },
  {
    sequelize,
    tableName: 'Customer',
    timestamps: false,
  }
);

export default CustomerModel;
