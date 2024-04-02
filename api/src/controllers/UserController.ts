import UserError from "../errors/User";
import User from "../models/User";
import UserService from "../services/UserService";

class UserController {
  private UserService: UserService;

  constructor() {
    this.UserService = new UserService();
  }

  post = async (req: any, res: any) => {
    try {
      const payload = req.body;

      const user: User | UserError = await this.UserService.create(payload);
      res.status(201).send(user);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  get = async (req: any, res: any) => {
    try {
      const users = await this.UserService.getAllUsers();
      res.status(200).send(users);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
}

export default UserController;
