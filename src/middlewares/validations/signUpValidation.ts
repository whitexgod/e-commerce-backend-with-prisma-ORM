import { NextFunction, Request, Response } from "express";
import { SignUpSchema } from "../../schema/users";
import { UnprocessableEntity } from "../../exceptions/validation";
import { ErrorCodes } from "../../exceptions/root";

export const SignUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
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
