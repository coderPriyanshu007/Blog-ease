import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { updateProfile } from "../controllers/userController.js";


const router = express.Router();

router.post('/update-profile',authenticate,updateProfile)


export default router;