import RoleError from "../errors/RoleError";
import Role from "../models/Role";
import UserRoles from "../models/UserRoles";
import { addRoleToUserPayload } from "../types";

export default class RoleService {
  async getByName(payload: any): Promise<Role | RoleError> {
    try {
      const role = await Role.findOne({ where: { name: payload.name } });
      if (role) {
        return role.toJSON();
      } else {
        throw new RoleError("Role not found");
      }
    } catch (error: any) {
      const errors = error.errors.map((error: any) => error.message);
      throw new RoleError(errors);
    }
  }

  async addRoleToUser(payload: addRoleToUserPayload): Promise<any> {
    try {
      const [role, __] = await Role.findOrCreate({ where: { role: payload.role } });
      //   if (role === null) {
      //     throw new RoleError("role not exists");
      //   }
      const [newRoleRecord, _] = await UserRoles.findOrCreate({
        where: { userId: payload.userId, roleId: role.id },
      });
    } catch (error: any) {
      const errors = error.errors.map((error: any) => error.message);
      throw new RoleError(errors);
    }
  }
}
