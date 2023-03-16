import { DataTypes, Model } from 'sequelize';
import sequelize from '../common/db/sequelize';
import CustomerModel from './customer.model';

class RoleModel extends Model {}

RoleModel.init(
  {
    RoleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      references: {
        model: CustomerModel,
        key: 'CustomerID',
      },
    },
  },
  {
    sequelize,
    tableName: 'Role',
    timestamps: false,
  }
);

export default RoleModel;
