import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: JwtPayload;
}
export function checkJwt(req: Request, res: Response, next: NextFunction): void {
  const options = {
    complete: true,
    clockTolerance: 0,
    ignoreExpiration: false,
    ignoreNotBefore: false,
  };

  const token = <string>req.headers["authorization"];

  try {
    const jwtPayload = <any>verify(token.split(" ")[1], "verysecretkey", options);
    console.log(jwtPayload);
    (req as CustomRequest).token = jwtPayload;
  } catch (e) {
    res
      .status(401)
      .type("json")
      .send(JSON.stringify({ message: "Missing or invalid token" }));
    return;
  }
  next();
}
