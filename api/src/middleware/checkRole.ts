import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./checkJwt";
import UserService from "../services/UserService";
// import { getUser, Roles } from "../state/users";

function arrIntersection(arr1: Array<String>, arr2: Array<String>) {
  const setA = new Set(arr1);
  const setB = new Set(arr2);

  let intersectionResult = [];

  for (let i of setB) {
    if (setA.has(i)) {
      intersectionResult.push(i);
    }
  }

  return intersectionResult.length > 0;
}

export function checkRole(roles: Array<String>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    const userId = (req as CustomRequest).token.payload.data.id;

    const user = await userService.getById(userId);

    if (!user) {
      res
        .status(404)
        .type("json")
        .send(JSON.stringify({ message: "User not found" }));
      return;
    }

    const userRoles = await userService.getRolesByUserId(userId);

    if (userRoles.length === 0) {
      res
        .status(404)
        .type("json")
        .send(JSON.stringify({ message: "User hasn`t roles" }));
      return;
    }

    if (arrIntersection(roles, userRoles)) next();
    else {
      res
        .status(403)
        .type("json")
        .send(JSON.stringify({ message: "Not enough permissions" }));
      return;
    }
  };
}
