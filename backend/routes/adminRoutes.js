import { Router } from "express";
import auth from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import { listAllGrievances, suspendStudent, updateGrievance } from "../controllers/adminController.js";

const router = Router();

router.use(auth, roles("admin", "officer"));

router.get("/grievances", listAllGrievances);
router.patch("/grievances/:id", updateGrievance);
router.post("/students/:id/suspend", suspendStudent);

export default router;
