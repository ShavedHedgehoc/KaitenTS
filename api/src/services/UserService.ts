import ApiError from "../errors/ApiError";
import UserError from "../errors/User";
import Role from "../models/Role";
import User from "../models/User";
import * as mapper from "./mapper";

class UserService {
  async create(userData: any): Promise<User> {
    try {
      const user = await User.create(userData);
      return user.toJSON();
    } catch (error: any) {
      // const errors = error.errors.map((error: any) => error.message);
      throw new ApiError(error.message);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        return user.toJSON();
      }
      throw new UserError();
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return user.toJSON();
      }
      throw new UserError();
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  async getRolesByUserId(id: number): Promise<Array<string>> {
    try {
      const roles = await User.findOne({
        include: { model: Role, as: "roles" },
        attributes: { exclude: ["id", "name", "email", "password"] },
        where: { id: id },
      });
      if (roles === null) {
        throw new ApiError("roles nor found");
      }
      return mapper.toRolesList(roles);
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  async getAllUsers(): Promise<User[] | []> {
    try {
      const users = await User.findAll();
      return users;
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }
}

export default UserService;
