import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../../schema/users";
import { UnprocessableEntity } from "../../exceptions/validation";
import { ErrorCodes } from "../../exceptions/root";

export const LoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    LoginSchema.parse(req.body);
  } catch (error: any) {
    next(
      new UnprocessableEntity(
        error?.cause?.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};
