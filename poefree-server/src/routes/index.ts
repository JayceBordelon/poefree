import { Router } from "express";
import authRoutes from "./authRoutes";
import poemRoutes from "./poemRoutes";

const router = Router();
router.get("/health", (req, res) => {
  res.sendStatus(200);
});
router.use("/auth", authRoutes);
router.use("/poem", poemRoutes);

export default router;
