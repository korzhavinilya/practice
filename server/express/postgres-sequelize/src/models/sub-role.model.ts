import { DataTypes, Model } from 'sequelize';
import sequelize from '../common/db/sequelize';
import RoleModel from './role.model';

class SubRoleModel extends Model {}

SubRoleModel.init(
  {
    SubRoleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    RoleID: {
      type: DataTypes.INTEGER,
      references: {
        model: RoleModel,
        key: 'RoleID',
      },
    },
  },
  {
    sequelize,
    tableName: 'SubRole',
    timestamps: false,
  }
);

export default SubRoleModel;
