import { Router } from "express";
import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import { createGrievance, listMyGrievances, rateGrievance } from "../controllers/grievanceController.js";

const router = Router();

router.use(auth, roles("student", "faculty"));

router.post("/", createGrievance);
router.get("/my", listMyGrievances);
router.post("/:id/rating", rateGrievance);

export default router;
