import { Request, Response } from "express";
import { prismaClient } from "../server";
import { hashSync } from "bcrypt";
import { config } from "../config/config";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    return res.status(403).json({
      message: "User already exists",
      success: false,
    });
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
