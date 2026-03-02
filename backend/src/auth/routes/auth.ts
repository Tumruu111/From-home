import { Router } from "express";
import { meController } from "../controller/auth";

const router = Router();

router.get("/me", meController);

export default router;
