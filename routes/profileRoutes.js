import { Router } from "express";
import {
  createProfile,
  getProfile,
  searchProfile,
} from "../controllers/profileController.js";

const router = Router();

router.post("/", createProfile);
router.get("/search", searchProfile);
router.get("/:id", getProfile);

export default router;
