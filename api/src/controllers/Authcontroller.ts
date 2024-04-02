import AuthService from "../services/AuthService";
import { RegisteredUser } from "../types";

class AuthController {
  private AuthService: AuthService;
  private options;

  constructor() {
    this.AuthService = new AuthService();
    this.options = {
      httpOnly: true,
      secure: true,
    };
  }

  register = async (req: any, res: any) => {
    try {
      const payload = req.body;
      const result: RegisteredUser = await this.AuthService.register(payload);
      return res.status(201).cookie("refreshToken", result.token, this.options).json(result.data);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  login = async (req: any, res: any) => {
    try {
      const payload = req.body;
      const result: RegisteredUser = await this.AuthService.login(payload);
      return res.status(201).cookie("refreshToken", result.token, this.options).json({ data: result.data });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  logout = async (req: any, res: any) => {
    try {
      const token = req.cookies["refreshToken"];
      if (token) {
        await this.AuthService.logout(token);
        return res.status(200).clearCookie("refreshToken", this.options).json({ msg: "logout, token removed" });
      }
      return res.status(200).json({ msg: "logout, token not removed" });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
}

export default AuthController;
