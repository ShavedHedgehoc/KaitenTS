import express from "express";
import AuthController from "../controllers/Authcontroller";

const router: express.Router = express.Router();

const controller: AuthController = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

export default router;
