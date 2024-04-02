import { dbRoles } from "../consts/consts";
import RegisterError from "../errors/RegisterError";
import { RegisteredUser } from "../types";
import RoleService from "./RoleService";
import TokenService from "./TokenService";
import UserService from "./UserService";
import * as mapper from "./mapper";
import * as bcrypt from "bcryptjs";

export default class AuthService {
  private UserService: UserService;
  private TokenService: TokenService;
  private RoleService: RoleService;

  constructor() {
    this.UserService = new UserService();
    this.TokenService = new TokenService();
    this.RoleService = new RoleService();
  }

  async checkPassword(plainPassword: string, hashPassword: string) {
    const passEqual = await bcrypt.compare(plainPassword, hashPassword);
    return passEqual;
  }

  async register(userData: any): Promise<RegisteredUser> {
    // add schema load data? reaise missing cred error
    const newUser = await this.UserService.create(userData);
    const defaultRole = dbRoles.USER;
    await this.RoleService.addRoleToUser({ userId: newUser.id, role: defaultRole });
    await this.RoleService.addRoleToUser({ userId: newUser.id, role: dbRoles.ADMIN });

    const roles = await this.UserService.getRolesByUserId(newUser.id);
    const tokens = await this.TokenService.generateTokens({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roles: roles,
    });
    await this.TokenService.createOrUpdate({ userId: newUser.id, token: tokens.refreshToken });
    const data = mapper.toRegisteredUserData(newUser, tokens, roles);
    return { data: data, token: tokens.refreshToken };
  }

  async login(userData: any): Promise<RegisteredUser> {
    const existsUser = await this.UserService.getByEmail(userData.email);
    const roles = await this.UserService.getRolesByUserId(existsUser.id);
    const passIsValid = await this.checkPassword(userData.password, existsUser.password);
    if (!passIsValid) {
      throw new RegisterError("Pass is invalid");
    }
    const tokens = await this.TokenService.generateTokens({
      id: existsUser.id,
      name: existsUser.name,
      email: existsUser.email,
      roles: roles,
    });
    await this.TokenService.createOrUpdate({ userId: existsUser.id, token: tokens.refreshToken });
    const data = mapper.toRegisteredUserData(existsUser, tokens, roles);
    return { data: data, token: tokens.refreshToken };
  }
  //   async refresh(): Promise<RegisteredUser> {
  // check token
  // generate new  tokens
  // write tokens to db
  // get user roles
  // return mapped response
  //   }
  async logout(data: any) {
    await this.TokenService.remove(data);
  }
}
