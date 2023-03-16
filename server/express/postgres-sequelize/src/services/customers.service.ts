import CustomerModel from '../models/customer.model';
import RoleModel from '../models/role.model';
import SubRoleModel from '../models/sub-role.model';

class CustomersService {
  async findAll() {
    RoleModel.hasMany(SubRoleModel, { as: 'subRoles', foreignKey: 'RoleID' });
    CustomerModel.hasMany(RoleModel, { as: 'roles', foreignKey: 'CustomerID' });
    return CustomerModel.findAll({
      include: [
        {
          model: RoleModel,
          as: 'roles',
          include: [
            {
              model: SubRoleModel,
              as: 'subRoles',
            },
          ],
        },
      ],
    });
    // return RoleModel.findAll({ include: 'subRoles' });
  }
}

export default new CustomersService();
