import jwt from "jsonwebtoken";
import { Tokens, createOrUpdateTokensPayload, generateTokensPayload } from "../types";
import ApiError from "../errors/ApiError";
import Token from "../models/Token";

export default class TokenService {
  async generateTokens(payload: generateTokensPayload): Promise<Tokens> {
    const accessToken = jwt.sign({ data: payload }, "verysecretkey", {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ data: payload }, "verysecretkey", {
      expiresIn: "30d",
    });
    const tokens = { accessToken: accessToken, refreshToken: refreshToken };
    return tokens;
  }

  async createOrUpdate(payload: createOrUpdateTokensPayload): Promise<any> {
    try {
      const token = await Token.findOne({ where: { userId: payload.userId } });
      if (token) {
        token.token = payload.token;
        await token.save();
        return token;
      }
      const newToken = await Token.create(payload);
      return newToken;
    } catch (error: any) {
      const errors = error.errors.map((error: any) => error.message);
      throw new ApiError(errors);
    }
  }

  async remove(payload: string): Promise<any> {
    try {
      return await Token.destroy({ where: { token: payload } });
    } catch (error: any) {
      const errors = error.errors.map((error: any) => error.message);
      throw new ApiError(errors);
    }
  }
}
