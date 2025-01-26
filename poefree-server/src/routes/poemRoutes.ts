import express from "express";
import { createPoem, deletePoem } from "../controllers/poemController";

const router = express.Router();

router.post("/", createPoem);
router.delete("/:id", deletePoem);

export default router;
