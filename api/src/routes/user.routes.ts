import express from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
import { dbRoles } from "../consts/consts";

const router: express.Router = express.Router();

const controller: UserController = new UserController();

router.post("/", controller.post);
router.get("/", [checkJwt, checkRole([dbRoles.ADMIN])], controller.get);

export default router;
