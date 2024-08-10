import { QueryInterface, Op } from 'sequelize';
import { randomUUID } from 'crypto';
import { RoleCreationAttributes } from '@src/roles/roles.model';
import { RoleName } from '@src/roles/dto/role.dto';
import { UserCreationAttributes } from '@src/users/users.model';
import { hash } from 'argon2';
import config from '@src/config/configuration';

const adminRoleId = randomUUID();
const roles: RoleCreationAttributes[] = [
  {
    id: adminRoleId,
    name: RoleName.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: randomUUID(),
    name: RoleName.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const roleNames = roles.map((role) => role.name);

const { rootUser } = config();

const users: UserCreationAttributes[] = [
  {
    id: randomUUID(),
    email: rootUser.email,
    passwordHash: '',
    name: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: adminRoleId,
  },
];

const userEmails = users.map((user) => user.email);

module.exports = {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      const rootUserFromList = users.find((u) => u.email === rootUser?.email);

      if (rootUserFromList) {
        const passwordHash = await hash(rootUser.password);
        rootUserFromList.passwordHash = passwordHash;
      }

      const role = await queryInterface.rawSelect(
        'Roles',
        {
          where: {
            name: roleNames[0],
          },
        },
        ['id']
      );
      if (!role) {
        await queryInterface.bulkInsert('Roles', roles, { transaction });

        const user = await queryInterface.rawSelect(
          'Users',
          {
            where: {
              email: userEmails[0],
            },
          },
          ['id']
        );
        if (!user) {
          await queryInterface.bulkInsert('Users', users, { transaction });
        }
      }
    }),
  down: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(
        'Users',
        {
          email: {
            [Op.in]: userEmails,
          },
        },
        { transaction }
      );
      await queryInterface.bulkDelete(
        'Roles',
        {
          name: {
            [Op.in]: roleNames,
          },
        },
        { transaction }
      );
    }),
};
