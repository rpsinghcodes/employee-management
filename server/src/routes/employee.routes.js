import express from "express";
import upload from "../config/multerConfig.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
	signup,
	login,
	getEmployee,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/signup", upload.single('image'), signup); // ✅
router.post("/login", login); // ✅
router.get("/", authMiddleware(['admin']), getEmployee); // ✅
router.get("/:id", authMiddleware(['admin']), getEmployeeById); // ✅
router.put("/:id", authMiddleware(['admin', 'employee']), upload.single('image'), updateEmployee); // ✅
router.delete("/:id", authMiddleware(['admin', 'employee']), deleteEmployee); // ✅

export default router;
