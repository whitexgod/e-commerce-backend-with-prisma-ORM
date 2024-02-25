import { Router } from "express";
import { login, signUp } from "../controllers/auth";
import { SignUpValidation } from "../middlewares/validations/signUpValidation";
import { LoginValidation } from "../middlewares/validations/loginValidation";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

authRoutes.post("/sign-up", SignUpValidation, errorHandler(signUp));

authRoutes.post("/login", LoginValidation, errorHandler(login));

export default authRoutes;
