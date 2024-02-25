import { Router } from "express";
import { signUp } from "../controllers/auth";

const authRoutes:Router = Router()

authRoutes.post('/sign-up', signUp)

export default authRoutes