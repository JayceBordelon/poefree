import { Router } from "express";
import userRoutes from "./userRoutes";
import poemRoutes from "./poemRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/poems", poemRoutes);

export default router;
