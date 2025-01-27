import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import { validateAndSanitize } from "../middleware/validateAndSanitize";

const router = Router();

router.post("/register", validateAndSanitize, createUser);
router.post("/login", validateAndSanitize, loginUser);
export default router;
