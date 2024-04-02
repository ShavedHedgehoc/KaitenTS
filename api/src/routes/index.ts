import express from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router: express.Router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
