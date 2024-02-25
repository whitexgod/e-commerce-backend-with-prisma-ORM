import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../server";
import { compareSync, hashSync } from "bcrypt";
import { config } from "../config/config";
import * as jwt from "jsonwebtoken";
import { BadRequestsException } from "../exceptions/Bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { NotFoundException } from "../exceptions/Not-found";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    return new BadRequestsException(
      "User alreay exists",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, Number(config.saltValue)),
    },
  });

  res.status(200).json({
    data: user,
    success: true,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    return new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    return new BadRequestsException(
      "Incorrect password",
      ErrorCodes.INCORRECT_PASSWORD
    );
  }
  const payload = {
    email: user.email,
  };
  const token = jwt.sign(payload, config.jwtSecret);

  return res.status(200).json({
    data: token,
    success: true,
  });
};
